import {
    ActionIcon,
    Avatar,
    Button,
    Card,
    Menu,
    Text,
    LoadingOverlay,
    Loader,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';

import {
    IconArrowsLeftRight,
    IconChevronRight,
    IconLogout,
    IconTrash,
    IconUser,
} from '@tabler/icons';
import { signIn, signOut, useSession } from 'next-auth/react';

interface Props {}

function UserIcon({}: Props) {
    const session = useSession();
    const theme = useMantineTheme();
    const { width } = useViewportSize();
    const isMobile = (width: number) =>
        !!(theme.breakpoints.md && width && width < theme.breakpoints.md);

    switch (session.status) {
        case 'loading':
        case 'authenticated':
            return (
                <Menu
                    shadow="md"
                    width="auto"
                    withArrow
                    //@ts-ignore for menu manual control
                    trigger="click" //none later
                    position="bottom"
                    styles={{
                        dropdown: {
                            background:
                                'linear-gradient(265.98deg, #121D28 46.72%, #111D27 100%)',
                        },
                        arrow: {
                            background:
                                'linear-gradient(265.98deg, #121D28 46.72%, #111D27 100%)',
                        },
                    }}
                >
                    <Menu.Target>
                        <ActionIcon
                            w="auto"
                            h="auto"
                            maw="100%"
                            style={{ display: 'inline-block' }}
                        >
                            <LoadingOverlay
                                visible={session.status === 'loading'}
                                radius={isMobile(width) ? 10 : 1000}
                                loader={<Loader variant="dots" />}
                            />
                            <MenuTarget
                                session={session}
                                isMobile={isMobile(width)}
                            />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        {!isMobile(width) ? (
                            <Menu.Label>
                                <MenuTarget
                                    session={session}
                                    isMobile={true}
                                    small
                                />
                            </Menu.Label>
                        ) : null}
                        <Menu.Label>Account</Menu.Label>
                        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                            Link other accounts
                        </Menu.Item>
                        <Menu.Item
                            color="red"
                            icon={<IconLogout size={14} />}
                            onClick={() => signOut()}
                        >
                            Logout
                        </Menu.Item>

                        <Menu.Divider />

                        <Menu.Label>Danger zone</Menu.Label>
                        <Menu.Item color="red" icon={<IconTrash size={14} />}>
                            Delete my account (contact: paras@styxo.codes)
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            );
        default:
            return <Button onClick={() => signIn()}>Login</Button>;
    }
}

interface MenuTargetProps {
    session: any;
    isMobile: boolean;
    small?: boolean;
}

function MenuTarget({ session, isMobile, small }: MenuTargetProps) {
    return isMobile ? (
        <Card
            shadow="sm"
            radius={10}
            style={{
                display: 'flex',
                gap: '15px',
                background: `linear-gradient(265.98deg, #112D47 46.72%, ${
                    small ? `#1b2733` : `#152228`
                } 100%)`,
                alignItems: 'center',
                width: '100%',
            }}
        >
            {!small ? (
                <Avatar
                    src={session.data?.user?.image}
                    radius="xl"
                    itemRef="no-referrer"
                    imageProps={{
                        referrerPolicy: 'no-referrer',
                    }}
                    style={{
                        minWidth: '45px',
                        width: '45px',
                        minHeight: '45px',
                        height: '45px',
                        border: '2px solid #88A47C',
                    }}
                >
                    <IconUser />
                </Avatar>
            ) : null}
            <div>
                <Text size="sm" weight="700" color="white">
                    {session.data?.user?.name}
                </Text>
                <Text size="xs" weight="400" color="#C1C2C5">
                    {session.data?.user?.email}
                </Text>
            </div>
            {!small ? <IconChevronRight color="#C1C2C5" /> : null}
        </Card>
    ) : (
        <Avatar
            src={session.data?.user?.image}
            radius="xl"
            itemRef="no-referrer"
            imageProps={{
                referrerPolicy: 'no-referrer',
            }}
            style={{
                minWidth: '45px',
                width: '45px',
                minHeight: '45px',
                height: '45px',
                border: '2px solid #88A47C',
            }}
        >
            <IconUser />
        </Avatar>
    );
}

export default UserIcon;
