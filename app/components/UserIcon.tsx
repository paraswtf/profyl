import {
    ActionIcon,
    Avatar,
    Button,
    Card,
    Menu,
    Text,
    LoadingOverlay,
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

    switch (session.status) {
        case 'loading':
        case 'authenticated':
            return (
                <Menu
                    shadow="md"
                    width={200}
                    withArrow
                    //@ts-ignore for menu manual control
                    trigger="click" //none later
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
                                radius={
                                    theme.breakpoints.md &&
                                    width &&
                                    width < theme.breakpoints.md
                                        ? 1000
                                        : 10
                                }
                            />
                            <MenuTarget session={session} />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
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
}

function MenuTarget({ session }: MenuTargetProps) {
    const theme = useMantineTheme();
    const { width } = useViewportSize();
    return theme.breakpoints.md && width && width < theme.breakpoints.md ? (
        <Card
            shadow="sm"
            radius={10}
            style={{
                display: 'flex',
                gap: '15px',
                background:
                    'linear-gradient(265.98deg, #112D47 46.72%, #152228 100%)',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Avatar
                src={session.data.user?.image}
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
                }}
            >
                <IconUser />
            </Avatar>
            <div>
                <Text size="sm" weight="700" color="white">
                    {session.data.user?.name}
                </Text>
                <Text size="xs" weight="400">
                    {session.data.user?.email}
                </Text>
            </div>
            <IconChevronRight />
        </Card>
    ) : (
        <Avatar
            src={session.data.user?.image}
            radius="xl"
            itemRef="no-referrer"
            imageProps={{
                referrerPolicy: 'no-referrer',
            }}
            style={{
                width: '45px',
                height: '45px',
            }}
        >
            <IconUser />
        </Avatar>
    );
}

export default UserIcon;
