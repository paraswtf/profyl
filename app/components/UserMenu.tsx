import {
    ActionIcon,
    Button,
    Menu,
    LoadingOverlay,
    Loader,
    createStyles,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';

import { IconArrowsLeftRight, IconLogout, IconTrash } from '@tabler/icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import UserDisplay from './UserDisplay';

interface Props {
    isLoggedIn?: boolean;
}

const useStyles = createStyles((theme) => ({
    menuPopover: {
        borderColor: '#373A40',
    },
    optionPrimary: {
        '&[data-hovered]': {
            background: `#112D47`,
        },
    },
    optionDanger: {
        '&[data-hovered]': {
            background: `rgba(224,49,49,0.2)`,
        },
    },
}));

function UserMenu({ isLoggedIn }: Props) {
    const session = useSession();
    const theme = useMantineTheme();
    const { width } = useViewportSize();
    const isMobile = (width: number) =>
        !!(theme.breakpoints.md && width && width < theme.breakpoints.md);
    const { classes } = useStyles();

    //Display login button if not logged in (client side cookie check to avoid loading flash)
    if (!isLoggedIn) return <Button onClick={() => signIn()}>Login</Button>;

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
                            backgroundImage:
                                'radial-gradient(#88A47C11 0.5px, transparent 0.5px), linear-gradient(265.98deg, #121D28 46.72%, #111D27 100%)',
                            backgroundSize: 'calc(10 * 0.5px) calc(10 * 0.5px)',
                        },
                        arrow: {
                            background:
                                'linear-gradient(265.98deg, #121D28 46.72%, #111D27 100%)',
                            borderColor: '#373A40',
                        },
                        divider: {
                            borderColor: '#373A40',
                        },
                    }}
                >
                    <Menu.Target>
                        <ActionIcon
                            w="100%"
                            h="auto"
                            maw="100%"
                            style={{
                                display: 'inline-block',
                                background: 'transparent',
                            }}
                        >
                            <UserDisplay isMobile={isMobile(width)} />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown className={classes.menuPopover}>
                        {!isMobile(width) ? (
                            <Menu.Label>
                                <UserDisplay isMobile={true} small />
                            </Menu.Label>
                        ) : null}
                        <Menu.Label>Account</Menu.Label>
                        <Menu.Item
                            color={theme.colors.gray[5]}
                            className={classes.optionPrimary}
                            icon={<IconArrowsLeftRight size={14} />}
                        >
                            Link other accounts
                        </Menu.Item>
                        <Menu.Item
                            color="red"
                            className={classes.optionDanger}
                            icon={<IconLogout size={14} />}
                            onClick={() => signOut()}
                        >
                            Logout
                        </Menu.Item>

                        <Menu.Divider c="#373A40" />

                        <Menu.Label>Danger zone</Menu.Label>
                        <Menu.Item
                            className={classes.optionDanger}
                            color="red"
                            icon={<IconTrash size={14} />}
                        >
                            Delete my account (contact: paras@styxo.codes)
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            );
        default:
            return <Button onClick={() => signIn()}>Login</Button>;
    }
}

export default UserMenu;
