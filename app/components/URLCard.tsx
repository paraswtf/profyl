import React from 'react';
import LinkIcon from './svg/LinkIcon';
import { Text, Tooltip, createStyles } from '@mantine/core';
import { truncateString } from '../../lib/utils';
import { showNotification } from '@mantine/notifications';
import Clipboard from 'react-clipboard.js';
import { IconChecklist, IconTrash } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    card: {
        all: 'unset',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'var(--light-navy, #344476)',
        border: '1px solid var(--light-blue, #4E8FCC)',
        padding: '8px 10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        '&:hover': {
            scale: '1.01 !important',
        },
        transition: 'all 0.1s ease',
        '&:active': {
            backgroundColor: 'var(--light-navy-active, #3B4E87)',
        },
    },
}));

export interface StoredURL {
    baseUrl: string;
    slug: string;
    longUrl: string;
    updateKey: string;
}

interface Props {
    data: StoredURL;
}

function URLCard(props: Props) {
    const { data } = props;
    const { classes } = useStyles();

    return (
        <div className={classes.card}>
            <Clipboard
                style={{ all: 'unset' }}
                data-clipboard-text={data.baseUrl + '/' + data.slug}
                onSuccess={() => {
                    showNotification({
                        key: 'copied',
                        title: 'Copied!',
                        message: 'The URL has been copied to your clipboard',
                        color: 'teal',
                        icon: <IconChecklist size={18} />,
                        autoClose: 2000,
                    });
                }}
                isVisibleWhenUnsupported
            >
                <Tooltip label="click to copy short url">
                    <div
                        style={{
                            width: 200,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Text
                            size={16}
                            style={{
                                margin: 0,
                                padding: 0,
                                marginTop: -3,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {data.slug}
                        </Text>
                        <Text
                            size={13}
                            style={{
                                color: 'var(--lightest-blue, #79ADDF)',
                                margin: 0,
                                padding: 0,
                                marginTop: -6,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {data.longUrl}
                        </Text>
                    </div>
                </Tooltip>
            </Clipboard>
            <Tooltip label="delete" color="#E16464">
                <div
                    style={{ display: 'flex' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        showNotification({
                            key: 'delete',
                            title: 'Not implemented yet!',
                            message: "The URL wasn't deleted",
                            color: 'red',
                            icon: <IconTrash size={18} />,
                            autoClose: 2000,
                        });
                        return false;
                    }}
                >
                    <IconTrash height={36} color="#E16464" />
                </div>
            </Tooltip>
        </div>
    );
}

export default URLCard;
