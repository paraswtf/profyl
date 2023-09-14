import { Button, createStyles } from '@mantine/core';
import React from 'react';

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
}

function ButtonDark(props: Props) {
    const {} = props;
    const useStyles = createStyles((theme) => ({
        button: {
            backgroundColor: '#3B5284',
            color: '#ffffff',
            transition: 'background-color 0.2s ease',
            '&:hover': {
                backgroundColor: '#445A8B',
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

export default ButtonDark;
