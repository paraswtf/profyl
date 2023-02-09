import { ActionIcon, Avatar, Button, Loader, Menu, Text } from '@mantine/core'
import {
    IconArrowsLeftRight,
    IconLogout,
    IconMessageCircle,
    IconPhoto,
    IconSearch,
    IconSettings,
    IconTrash,
    IconUser,
} from '@tabler/icons'
import { signIn, signOut, useSession } from 'next-auth/react'

interface Props {
    src?: string
}

function UserIcon({ src }: Props) {
    const session = useSession()
    switch (session.status) {
        case 'loading':
            return <Loader color={'gray'} />
        case 'authenticated':
            return (
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <ActionIcon>
                            <Avatar
                                src={session.data.user?.image}
                                radius="xl"
                                itemRef="no-referrer"
                                imageProps={{ referrerPolicy: 'no-referrer' }}
                            >
                                <IconUser />
                            </Avatar>
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown sx={{ zIndex: 999 }}>
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
            )
        default:
            return <Button onClick={() => signIn()}>Login</Button>
    }
}

export default UserIcon
