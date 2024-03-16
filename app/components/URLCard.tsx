import React from 'react';
import LinkIcon from './svg/LinkIcon';
import { Text } from '@mantine/core';
import { truncateString } from '../../lib/utils';

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

    return (
        <div
            style={{
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'var(--light-navy, #344476)',
                border: '1px solid var(--light-blue, #4E8FCC)',
                padding: '8px 10px',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <LinkIcon height={36} />
                <div>
                    <Text
                        size={16}
                        style={{ margin: 0, padding: 0, marginTop: -3 }}
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
                        }}
                    >
                        {truncateString(data.longUrl, 18)}
                    </Text>
                </div>
            </div>
            <Text size={13}>click to copy</Text>
        </div>
    );
}

export default URLCard;
