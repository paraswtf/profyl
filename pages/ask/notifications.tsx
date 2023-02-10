import React, { useState } from 'react';
import Head from 'next/head';
import { Card, Center, Space, Text } from '@mantine/core';
import request from '../../lib/api';
import { useEffectOnce } from 'react-use';

function renderNotifications(
    notifications: undefined | null | { message: string }[]
) {
    console.log(notifications);
    if (notifications === undefined)
        return (
            <Card w="80%" py={10}>
                <Text size={15} weight="bold" align="center">
                    Loading...
                </Text>
            </Card>
        );
    else if (notifications === null)
        return (
            <Card w="80%" py={10}>
                <Text size={15} weight="bold" align="center">
                    Please login to view notifications
                </Text>
            </Card>
        );
    else if (!notifications.length)
        return (
            <Card w="80%" py={10}>
                <Text size={15} weight="bold" align="center">
                    No notifications to show
                </Text>
            </Card>
        );
    else
        return notifications.map((notification, index) => (
            <Card w="80%" py={10} key={index}>
                <Text size={15} weight="bold" align="center">
                    {notification.message.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </Text>
            </Card>
        ));
}

interface Props {}

async function getNotifications() {
    const notifications = await request('/ask/notifications', {}, 'GET');
    if (notifications.status === 200)
        return notifications as any as { notifications: { message: string }[] };
    else return { notifications: null };
}

function Notifications(props: Props) {
    const {} = props;

    const [notifications, setNotifications] = useState<
        undefined | null | { message: string }[]
    >();
    useEffectOnce(() => {
        getNotifications().then((res) =>
            res.notifications
                ? setNotifications(res.notifications)
                : setNotifications(null)
        );
    });

    return (
        <div>
            <Head>
                <title>Profyl - Ask 💕</title>
            </Head>
            <Center
                w="auto"
                style={{
                    flexDirection: 'column',
                }}
            >
                <Card
                    w="min(850px, calc(100vw - 30px))"
                    mt="250px"
                    mb="250px"
                    bg="#121212"
                    h="auto"
                >
                    <Text size={24} weight="bold" align="center">
                        Notifications
                    </Text>
                    <Space h="sm" />
                    <Center sx={{ flexDirection: 'column', gap: '10px' }}>
                        {renderNotifications(notifications)}
                    </Center>
                </Card>
            </Center>
        </div>
    );
}

export default Notifications;
