import type { NextPage } from 'next';
import { Center, Text, createStyles, Card, Space } from '@mantine/core';
import HeroImage from './components/InteractiveHeroImage';
import ButtonLight from './components/ButtonLight';
import ButtonDark from './components/ButtonDark';
import { signIn } from 'next-auth/react';
import Transparency from './components/svg/TransparencyIllustration';
import Api from './components/svg/ApiIllustration';
import Data from './components/svg/DataCollectionIllustration';
import TrySection from './sections/TrySection';

const useStyles = createStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: 288,
        padding: 15,
        gap: 10,
        backgroundColor: '#1C315E',
        color: '#FFFFFF',
    },
}));

const Home: NextPage = () => {
    const { classes } = useStyles();
    return (
        <div
            style={{
                width: '100%',
                paddingTop: '180px',
                paddingBottom: '100px',
                backgroundImage:
                    'radial-gradient(#88A47C41 1px, transparent 1px), radial-gradient(#88A47C41 1px, transparent 1px)',
                backgroundSize: 'calc(20 * 1px) calc(20 * 1px)',
                backgroundPosition: '0 0, calc(10 * 1px) calc(10 * 1px)',
            }}
        >
            <Center
                w="100%"
                h="100%"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                }}
            >
                <HeroImage />
                <Text size={20} variant="text" fw="bold">
                    Shorten your URLs with ease
                </Text>
                <TrySection />
                <Card className={classes.card}>
                    <Text size={20} weight={700}>
                        Want to get more out of Profyl?
                    </Text>
                    <Text size={15} weight={500}>
                        Sign up to get access to the beta features like,
                        customisable URLs, link-in-bio, and more...
                    </Text>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10,
                        }}
                    >
                        <ButtonDark onClick={signIn}>Sign up</ButtonDark>
                        <ButtonLight onClick={signIn}>Log in</ButtonLight>
                    </div>
                </Card>
                <Space h="xl" />
                <Text size={20} variant="text" fw="bold">
                    Why Profyl?{' '}
                </Text>
                <Transparency className="transparency-svg" />
                <Text size={15} variant="text" fw="bold">
                    Complete transparency
                </Text>
                <Text size={15} variant="text" w="281px">
                    Since profyl is open source, you always know how your data
                    is being processed.
                </Text>
                <Space h="sm" />
                <Api className="api" />
                <Text size={15} variant="text" fw="bold">
                    A simple and robust API
                </Text>
                <Text size={15} variant="text" w="281px">
                    All you need is your API key to generate shortened URLs
                    right from your own app.
                </Text>
                <Space h="sm" />
                <Data className="data" />
                <Text size={15} variant="text" fw="bold">
                    Data at your fingertips
                </Text>
                <Text size={15} variant="text" w="281px">
                    Get access to valuable insights like link clicks and refs
                    right from your dashboard.
                </Text>
            </Center>
        </div>
    );
};

export default Home;
