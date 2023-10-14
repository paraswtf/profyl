import { Avatar, Card, createStyles, Text } from '@mantine/core';
import { IconUser, IconChevronRight } from '@tabler/icons';
import { useSession } from 'next-auth/react';

interface MenuTargetProps {
    isMobile: boolean;
    small?: boolean;
}

const useStyles = createStyles((theme) => ({
    userInfoCard: {
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    avatarAndinfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
}));

export default function UserDisplay({ isMobile, small }: MenuTargetProps) {
    const { classes } = useStyles();
    const session = useSession();
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
            <div className={classes.avatarAndinfo}>
                {!small ? (
                    <UserIcon
                        src={session.data?.user?.image}
                        isLoading={session.status === 'loading'}
                    />
                ) : null}
                <div className={classes.infoContainer}>
                    {session.status === 'loading' ? (
                        <LoadingPlaceholder
                            height={14}
                            width={128}
                        ></LoadingPlaceholder>
                    ) : (
                        <Text size="sm" weight="700" color="white">
                            {session.data?.user?.name}
                        </Text>
                    )}

                    {session.status === 'loading' ? (
                        <LoadingPlaceholder
                            height={12}
                            width={86}
                        ></LoadingPlaceholder>
                    ) : (
                        <Text size="xs" weight="400" color="#C1C2C5">
                            {session.data?.user?.email}
                        </Text>
                    )}
                </div>
            </div>
            {!small ? <IconChevronRight color="#C1C2C5" /> : null}
        </Card>
    ) : (
        <UserIcon
            src={session.data?.user?.image}
            isLoading={session.status === 'loading'}
        />
    );
}

function UserIcon(props: { isLoading: boolean; src?: string | null }) {
    const {
        classes: { avatar },
    } = createStyles((theme) => ({
        avatar: {
            minWidth: '45px',
            width: '45px',
            minHeight: '45px',
            height: '45px',
            border: '2px solid #88A47C',
        },
    }))();
    return (
        <Avatar
            className={avatar}
            src={props.src}
            radius="xl"
            itemRef="no-referrer"
            imageProps={{
                referrerPolicy: 'no-referrer',
            }}
        >
            {props.isLoading ? (
                <LoadingPlaceholder height={45} width={45} />
            ) : (
                <IconUser />
            )}
        </Avatar>
    );
}

function LoadingPlaceholder(props: {
    height: number;
    width: number;
    borderRadius?: number;
}) {
    const {
        classes: { loadingPlaceholder },
    } = createStyles((theme) => ({
        loadingPlaceholder: {
            width: props.width,
            height: props.height,
            background:
                'linear-gradient(to right, #1C315E 8%, #445A8B 38%, #1C315E 54%)',
            backgroundSize: '1000px 640px',
            animation: 'loading 1.5s infinite',
            '@keyframes loading': {
                '0%': {
                    backgroundPosition: '-468px 0',
                },
                '100%': {
                    backgroundPosition: '468px 0',
                },
            },
            borderRadius: props.borderRadius ?? 2,
        },
    }))();
    return <div className={loadingPlaceholder}></div>;
}
