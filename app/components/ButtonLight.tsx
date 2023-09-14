import { Button, createStyles } from '@mantine/core';
import React from 'react';

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
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
        <Button className={classes.button} onClick={props.onClick}>
            {props.children}
        </Button>
    );
}

export default ButtonLight;
