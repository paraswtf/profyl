import React from 'react';
import { createStyles, MantineNumberSize } from '@mantine/styles';
import { Text } from '@mantine/core';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons';

interface Props {
    children: React.ReactNode;
    size?: MantineNumberSize;
    href: string;
}

const useStyles = createStyles((theme) => ({
    link: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        textDecoration: 'none',
        gap: '10px',
        whiteSpace: 'nowrap',
    },
    text: {
        display: 'inline-block',
        position: 'relative',
        fontWeight: 700,
        color: 'white',
        ':after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            transform: 'scaleX(0)',
            height: '1px',
            bottom: '10%',
            left: '0',
            backgroundColor: 'white',
            transformOrigin: 'bottom left',
            transition: 'transform 0.20s ease-out',
        },
        ':hover:after': {
            transform: 'scaleX(1)',
            transformOrigin: 'bottom left',
        },
    },
    arrow: {
        display: 'none',
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            display: 'inline-block',
        },
    },
}));

function NavLink({ href, size, children, ...props }: Props) {
    const { classes } = useStyles();

    return (
        <Link href={href} className={classes.link}>
            <IconArrowRight color="white" className={classes.arrow} />
            <Text className={classes.text} size={size}>
                {children}
            </Text>
        </Link>
    );
}

export default NavLink;
