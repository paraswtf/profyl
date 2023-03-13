import { Avatar, Card, createStyles, Text } from '@mantine/core';
import { IconUser, IconChevronRight } from '@tabler/icons';

interface MenuTargetProps {
    session: any;
    isMobile: boolean;
    small?: boolean;
}

const useStyles = createStyles((theme) => ({
    avatar: {
        minWidth: '45px',
        width: '45px',
        minHeight: '45px',
        height: '45px',
        border: '2px solid #88A47C',
    },
    userInfoCard: {
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        width: '100%',
    },
}));

export default function UserDisplay({
    session,
    isMobile,
    small,
}: MenuTargetProps) {
    const { classes } = useStyles();
    return isMobile ? (
        <Card
            className={classes.userInfoCard}
            shadow="sm"
            radius={10}
            sx={{
                background: `linear-gradient(265.98deg, #112D47 46.72%, ${
                    small ? `#1b2733` : `#152228`
                } 100%)`,
            }}
        >
            {!small ? (
                <Avatar
                    className={classes.avatar}
                    src={session.data?.user?.image}
                    radius="xl"
                    itemRef="no-referrer"
                    imageProps={{
                        referrerPolicy: 'no-referrer',
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
            className={classes.avatar}
            src={session.data?.user?.image}
            radius="xl"
            itemRef="no-referrer"
            imageProps={{
                referrerPolicy: 'no-referrer',
            }}
        >
            <IconUser />
        </Avatar>
    );
}
