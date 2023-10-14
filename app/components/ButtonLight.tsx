import { Button, createStyles } from '@mantine/core';
import React from 'react';

interface Props {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'submit' | 'reset' | 'button';
    h?: string;
    w?: string;
}

function ButtonLight(props: Props) {
    const {} = props;
    const useStyles = createStyles((theme) => ({
        button: {
            backgroundColor: '#4084C5',
            color: '#ffffff',
            transition: 'background-color 0.2s ease',
            '&:hover': {
                backgroundColor: '#4E8FCC',
            },
        },
    }));

    const { classes } = useStyles();

    return (
        <Button
            className={[classes.button, props.className].join(' ')}
            onClick={props.onClick}
            type={props.type}
            h={props.h}
            w={props.w}
        >
            {props.children}
        </Button>
    );
}

export default ButtonLight;
