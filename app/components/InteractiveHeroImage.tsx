import { createStyles, Text } from '@mantine/core';
import { IconClick } from '@tabler/icons';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

interface Props {
    height?: number;
    partial?: boolean;
    color?: string;
}

const useStyles = createStyles((theme, _params, getRef) => ({
    cls1: {
        fill: '#799bbc',
        opacity: 0.5,
        isolation: 'isolate',
    },
    cls2: {
        fill: 'none',
        stroke: theme.colorScheme === 'dark' ? '#3a4c5e' : '#263238',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    },
    cls3: {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: '#999',
        stroke: '#263238',
    },
    cls4: {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#263238',
        fill: '#b2b2b2',
    },
    cls5: {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#263238',
        fill: '#263238',
    },
    cls6: {
        fill: '#263238',
    },
    cls7: {
        fill: '#b2b2b2',
    },
    cls8: {
        fill: '#999',
    },
    cls9: {
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#263238',
    },
    cls10: {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#263238',
        fill: '#e6e2c3',
    },
    cls11: {
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#263238',
        strokeWidth: '0.5px',
    },
    cls12: {
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#666',
    },
    cls13: {
        isolation: 'isolate',
        opacity: 0.3,
    },
    cls14: {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#263238',
        fill: '#a8a8a8',
    },
    cls15: {
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#b2b2b2',
    },
    cls16: {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#263238',
        fill: '#4084c5',
    },
    cls17: {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#263238',
        fill: '#88a47c',
    },
    cls18: {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#263238',
        strokeWidth: '0.5px',
        fill: '#4084c5',
    },
    cls19: {
        fill: '#e6e2c3',
    },
    cls20: {
        fill: '#4084c5',
    },
    cls21: {
        fillOpacity: 0.8,
        fill: 'url(#linear-gradient)',
    },
    cls22: {
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: '#fff',
        strokeWidth: '2px',
    },
    cls23: {
        fill: '#350800',
        fillOpacity: 0.15,
    },
    linkBoxGroup: {
        '&:hover': {
            transform: 'translate(-3.5px, -4.5px) scale(1.04)',
        },
        transition: 'transform 0.2s ease',
    },
    linkBox: {
        cursor: 'pointer',
    },
    clicksBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '-10%',
        width: 'max-content',
    },
    clicksInnerBox: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
    },
    clicksSubText: {
        fontSize: 12,
    },
    heroImage: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

export default function HeroImage(props: Props = { height: 100 }) {
    const { classes } = useStyles();
    return (
        <div className={classes.heroImage}>
            <div className={classes.clicksBox}>
                <div className={classes.clicksInnerBox}>
                    <IconClick />
                    <Text>Clicks: 32</Text>
                </div>
                <Text className={classes.clicksSubText}>(past 24 hours)</Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="288"
                    height="250.36"
                    viewBox="0 0 288 250.36"
                >
                    <defs>
                        {/* <style>.cls1,.cls13{isolation:isolate;}.cls11,.cls12,.cls15,.cls2,.cls22,.cls9{fill:none;}.cls2{stroke:#3a4c5e;}.cls10,.cls11,.cls12,.cls14,.cls15,.cls16,.cls17,.cls18,.cls2,.cls22,.cls3,.cls4,.cls5,.cls9{strokeLinecap:round;strokeLinejoin:round;}.cls3,.cls8{fill:#999;}.cls10,.cls11,.cls14,.cls16,.cls17,.cls18,.cls3,.cls4,.cls5,.cls9{stroke:#263238;}.cls4,.cls7{fill:#b2b2b2;}.cls5,.cls6{fill:#263238;}.cls10,.cls19{fill:#e6e2c3;}.cls11,.cls18{strokeWidth:0.5px;}.cls12{stroke:#666;}.cls13{opacity:0.3;}.cls14{fill:#a8a8a8;}.cls15{stroke:#b2b2b2;}.cls16,.cls18,.cls20{fill:#4084c5;}.cls17{fill:#88a47c;}.cls21{fill-opacity:0.8;fill:url(#linear-gradient);}.cls22{stroke:#fff;strokeWidth:2px;}.cls23{fill:#350800;fill-opacity:0.15;}</style> */}
                        <linearGradient
                            id="linear-gradient"
                            x1="12"
                            y1="195.37"
                            x2="205.11"
                            y2="195.37"
                            gradientTransform="matrix(1, 0, 0, -1, 0, 272)"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0" stopColor="#79addf" />
                            <stop offset="1" stopColor="#5286b9" />
                        </linearGradient>
                    </defs>
                    <path
                        id="Floor"
                        className={classes.cls1}
                        d="M144,269.86c79.53,0,144-11.38,144-25.4s-64.47-25.4-144-25.4S0,230.43,0,244.46,64.47,269.86,144,269.86Z"
                        transform="translate(0 -19.5)"
                    />
                    <g id="Window">
                        <path
                            className={classes.cls2}
                            d="M195.37,30.81a31.53,31.53,0,0,0-7.83,20.82h24.22Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls2}
                            d="M240.59,28.34l-16,23.29h26.19a31.62,31.62,0,0,0-10.23-23.29Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls2}
                            d="M197.1,29l17.71,22.65h2.09V20.09A31.47,31.47,0,0,0,197.1,29Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls2}
                            d="M215.3,139.44H186.89V175H215.3Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls2}
                            d="M219.37,20V51.63h2.27L238.7,26.74A31.47,31.47,0,0,0,219.37,20Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls2}
                            d="M250.82,56.8H222.41V92.31h28.41Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls2}
                            d="M215.3,98.12H186.89v35.52H215.3Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls2}
                            d="M250.82,98.12H222.41v35.52h28.41Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls2}
                            d="M250.82,139.44H222.41V175h28.41Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls2}
                            d="M215.3,56.8H186.89V92.31H215.3Z"
                            transform="translate(0 -19.5)"
                        />
                    </g>
                    <g id="Couch">
                        <path
                            className={classes.cls3}
                            d="M210.32,190.87s3.24-8.1,1.2-24.9c-.9-7.36-.25-22.49-10.33-23-10.74-.52-15.14.55-25.94.67-38.85.44-67.42,4.32-91.12,2-19-1.85-35.47-4.85-42.24,1.92s-6.17,21.19-5.55,24,5,21.94,5,21.94l168-.76Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls4}
                            d="M43.53,186s-3.24-13-8.54-16.48-12.21.29-18,5.88-7.37,12.22-5,23.28,9.27,27.37,11.33,34.73,2.06,11.18,9,13.54,13.54,2.5,17.81-3.39,3.09-33-.3-43.12S43.53,186,43.53,186Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls5}
                            d="M42.91,243.14c-2.92-5.6-11.73-45.49-11.61-50.93S27,177.64,21.59,176.9c-4.49-.61-8.08,3.71-9.2,5.22-1.75,4.32-1.85,9.55-.36,16.57,2.35,11,2.05,27.71,4.11,35.07s2.07,11.19,9,13.55c4.55,1.54,16.19,1.79,19.9.34A35.57,35.57,0,0,0,42.91,243.14Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls4}
                            d="M201.46,185.78s3.43-13,9-16.48,12.9.29,19,5.88,7.78,12.22,5.29,23.26-9.8,27.37-12,34.73-2.17,11.19-9.48,13.54-14.3,2.47-18.81-3.38-3.26-33,.31-43.12S201.46,185.78,201.46,185.78Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls5}
                            d="M202.09,243.71c3.09-5.67,12.43-46,12.28-51.56s4.51-14.75,10.25-15.5c4.75-.61,8.53,3.71,9.72,5.28,1.85,4.37,2,9.67.39,16.78-2.47,11.17-6.29,27.71-8.47,35.16s-2.17,11.32-9.48,13.71c-4.8,1.57-13,2.16-16.9.69A34.85,34.85,0,0,1,202.09,243.71Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls3}
                            d="M214.44,210.88s-3.7,22.86-6,30.51-1.62,7.65-5.59,8-154.74-.13-159.44-.86-7.22-4.27-8.55-9.27-2.65-27.71-2.65-27.71l175.94-.62Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M32.2,215.11a5.13,5.13,0,0,0,3.95,3.09c3.09.56,82.8,1.41,85.34,1.41s67.54,0,78-.85,15.78-2.23,14.95-7.89-.54-1.15-.54-1.15L30.47,212Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls7}
                            d="M44,185.3S32.63,193,29.39,196.48s-1.47,6.33-1.18,9,1.62,8.53,5.45,10.59,51.36,1.18,79.06,2.07,87.18-.18,94.54-1.94,9.11-10.89,9.55-16.06S212,187.77,209,186.87s-27.42-1-54.65-.42-39.73,3-70.79,2.37S51,184,44,185.3Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls8}
                            d="M28.21,205.46c.3,2.64,1.62,8.53,5.45,10.59s51.36,1.18,79.06,2.07,87.18-.18,94.54-1.94,11.77-8.83,12.21-14a6.62,6.62,0,0,0-.26-2.3c-1,1-3-.09-5.39-.43-5.25-.75-60.43,2.68-101.73,2.68-44.84,0-59.45,0-81.64-4.27-3.31-.62-1-1.4-1-1.4C26.15,200,27.92,202.81,28.21,205.46Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls9}
                            d="M44,185.3S32.63,193,29.39,196.48s-1.47,6.33-1.18,9,1.62,8.53,5.45,10.59,51.36,1.18,79.06,2.07,87.18-.18,94.54-1.94,9.11-10.89,9.55-16.06S212,187.77,209,186.87s-27.42-1-54.65-.42-39.73,3-70.79,2.37S51,184,44,185.3Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls9}
                            d="M124.07,146.29l-.25,41.7s-1.82,11.4-1.59,13,.23,17.09.23,17.09"
                            transform="translate(0 -19.5)"
                        />
                    </g>
                    <g id="Person">
                        <path
                            className={classes.cls5}
                            d="M49.91,165.46s1-.12,3.09-2.59,4.45-4.32,6.66-4.19-1.85,1.72-1.85,1.72,3.82-1,6.54.38-1.11,2.58-1.11,2.58,4.44,1.36,4.19,3.22-1.11,1.35-6.41,1.35-8,1.36-10.24.62S47.07,167.56,49.91,165.46Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls10}
                            d="M42.52,141.51s3.58,1.89,4.75,3.78,0,3.55,2.7,3.86c1.5.17,3.49.14,3.49,1.6a8.65,8.65,0,0,1-.15,2s1.31,5.24,1.16,6.41-5.08,2.62-5.08,2.62a4.64,4.64,0,0,0,.72,3.2,72.06,72.06,0,0,0,6.55,5.81c.73.58-14.11,2.33-14.11,2.33s-3.34-7-7.86-9.45-6.69-2.33-6.84-4.8,4.08-11.5,8-14.41S42.52,141.51,42.52,141.51Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M47.63,150.63c-.22.11-.44.21-.67.3a.56.56,0,0,0,0,.12c.2.5.52.85.72.77s.18-.55,0-1Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls7}
                            d="M46.43,151.91a3.7,3.7,0,0,0,1.85-.36Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls11}
                            d="M46.43,151.91a3.7,3.7,0,0,0,1.85-.36"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls5}
                            d="M49.39,161.81a19.35,19.35,0,0,1-6.07.38s4.29,2.63,6.18,2.44Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls7}
                            d="M46.82,149.13l.82,1.33a6,6,0,0,1-2.33,1.16"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls9}
                            d="M46.82,149.13l.82,1.33a6,6,0,0,1-2.33,1.16"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls7}
                            d="M48.63,155.43s.56,1.21,2.9.33Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls9}
                            d="M48.63,155.43s.56,1.21,2.9.33"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls7}
                            d="M45.74,146.9a2.52,2.52,0,0,0-2.66,1.78Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls9}
                            d="M45.74,146.9a2.52,2.52,0,0,0-2.66,1.78"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M44.37,140.31s-1.23,7-2.47,11.26-2.82,6.84-3.22,8.45,1.61,5.63,1,7.32-1.24-.8-4.95-2.89-6.75-4.11-8.53-5.32c-7.73-5.28,5.45-19.47,11.35-20.11S44.69,138.54,44.37,140.31Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls12}
                            d="M44.72,138.86s-4,18.85-16.73,23.47"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls12}
                            d="M42,137.9s-5.56,16.92-16.92,21"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls12}
                            d="M31.26,140.78s-.38,12.31-7.12,17.3"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls9}
                            d="M44.37,140.31s-1.23,7-2.47,11.26-2.82,6.84-3.22,8.45,1.61,5.63,1,7.32-1.24-.8-4.95-2.89-6.75-4.11-8.53-5.32c-7.73-5.28,5.45-19.47,11.35-20.11S44.69,138.54,44.37,140.31Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls7}
                            d="M40.75,158.09s-2.74-2.42-4.43-1.69-.32,3.78.73,4a4.84,4.84,0,0,0,3.37-.08"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls9}
                            d="M40.75,158.09s-2.74-2.42-4.43-1.69-.32,3.78.73,4a4.84,4.84,0,0,0,3.37-.08"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls13}
                            d="M21.8,173.7s7.83,3.7,9.38,7.71,1.85,8.34,4.63,9.88a48.34,48.34,0,0,0,13.59,5.56,43,43,0,0,0,10.5.93s10.81.62,18.84.62,20.38-2.47,20.38-2.47,8.95.92,14.51-10.2,26.25-26.55,27.79-38.29c0,0-25,12.05-28.71,17.3S84,183.57,71,183.57s-28.1-9.88-36.44-15.44S21.38,168.15,21.8,173.7Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls4}
                            d="M49.8,184.68S44.73,174.54,41,169s-7.12-8.21-11.23-10.38-6.39-2.89-8.46-3.86-2.66-.48-2.9,3.74-1.24,11.59,3.38,15.21,6.64,3.5,9.42,4.83,4.22,4.94,6.51,9.65,9.41,4.71,12.19,4.47S51.49,187.46,49.8,184.68Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls5}
                            d="M97.71,170s6-18,8.21-19.77,22.84-7.73,30.74-9.52,18.19-9.49,19.32-10.62,3.7-2.42,2.89.8a15.05,15.05,0,0,1-3.22,6.79c-1.61,2-.62,3.54-1.61,5.31s-2.73,1.77-5.47.16-3.86-1.61-7.08.81-9.18,8.21-15.61,10.13a81,81,0,0,1-8.53,2.26S114.45,170,110.59,176s-5.31,8.69-11.58,7.57-3.54-10.79-3.22-11.74S97.71,170,97.71,170Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls4}
                            d="M154,143c1-1.77,0-3.38,1.61-5.31a14.8,14.8,0,0,0,3.22-6.79c.81-3.26-1.77-1.93-2.89-.81a65.7,65.7,0,0,1-14.7,9.08,14.87,14.87,0,0,1,1.95,3.59c2-1.17,3.17-.91,5.34.37C151.31,144.73,153.08,144.73,154,143Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls14}
                            d="M156,130.09a5.27,5.27,0,0,1-.51.43,5.18,5.18,0,0,0,3,1.73c.12-.42.25-.87.37-1.36C159.68,127.68,157.1,129,156,130.09Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls5}
                            d="M85.49,194s16.89,3.09,23.17.81,8.85-9.18,10.62-14.16,2.1-14.32,3.06-17.06,1.28-3.54,1.28-3.54,7.42-3.38,11.74-5.63,7.89-10.94,10.46-12.88,2.9.62,4.33-.8,4-7.25,4.5-11S152.91,124,152,124s-.8,1.93-2.42,4.32-4,7.24-6.43,8.86-13.84,8.2-18.18,10.61-10,3.71-12.88,8.69-7.72,15.44-8.37,16.58a27.46,27.46,0,0,1-1.61,2.42,55,55,0,0,1-5.31,1.76c-3.38,1-7.41.49-9.33,2.42S85.49,194,85.49,194Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls15}
                            d="M104.84,170.91s8.3-17.29,9.64-17.6,18.93-10,18.93-10"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls15}
                            d="M96.91,180.46a35.77,35.77,0,0,1,2.74,7.24"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls15}
                            d="M98.2,180.94s1.61.48,3.09,4.18"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls15}
                            d="M101.74,186.25a21,21,0,0,0,.62,2.09"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls4}
                            d="M152,124c-1,0-.8,1.93-2.42,4.32s-4,7.24-6.43,8.86c-.49.32-1.34.84-2.42,1.5,1.23.53,2.47,1.89,3.36,4.89a9.49,9.49,0,0,1,1.79-2c2.58-1.94,2.9.61,4.33-.81s4-7.24,4.5-10.94S152.91,124,152,124Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls14}
                            d="M152,124c-.78,0-.83,1.24-1.66,3a18,18,0,0,1,4.43,2.42C155,125.93,152.88,124,152,124Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls16}
                            d="M75.38,165.82a11.62,11.62,0,0,0-2.85,2.07,57.64,57.64,0,0,0-3.09,5.1l3.46,3.63,2.5-8.73,1.3-.95Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls16}
                            d="M44,169.11a106,106,0,0,1,13.87-1.81c5.31-.11,7-.84,8.82.84s6.64,6.88,7.48,7.73S90.24,175,90.24,175s1.45,3.62.48,9.66A17.1,17.1,0,0,1,86,194.1s-10.15,1.48-16.9,1c-12.92-1-17.69-5.65-21-9.63s-5.87-12.58-6-14.15S44,169.11,44,169.11Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls17}
                            d="M76.31,168.55s-6.27.8-6.92,2.57,2.58,14.16,3.55,14.82,3.37-1,3.37-1a77.21,77.21,0,0,0,13.85.32c8.2-.49,10.93-4.33,11.9-4.51s3.54-.81,3.38-1.61-2.57-8.53-6.11-11.26-9-3.38-14-1.77C82.36,167.1,79.36,167.9,76.31,168.55Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls4}
                            d="M73.82,168.38l1.33,6.21,19.43-2.46-3.86-5.67Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M84.6,168.77l.34.88,1.21-.17-.33-.88Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M86.25,169.77l-1.19.17.42,1.06,1.17-.16Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M79,171.91l1-.13-.35-1.08-1,.14Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M86.13,168.56l.33.87,1.19-.16-.32-.87Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M79.54,169.45l.3.91,1.39-.2-.31-.89Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M82.93,169l.35.88,1.35-.19-.35-.88Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M81.23,169.23l.31.89,1.43-.2-.36-.89Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M85.16,171.05,84.74,170l-1.34.19.42,1.06Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M87.07,171.1l.2.53,1.19-.15-.21-.55Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M89.21,169.36l-1.14.16.39,1.07,1.19-.17Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M86.57,169.73,87,170.8l1.19-.17-.4-1.06Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M90.34,171.25l1.52-.18-.32-.6-1.44.21Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M80.39,172l.14.42,1.44-.18-.16-.44Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M81.34,170.46l-1.4.2.35,1.07,1.42-.19Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M83.08,170.22l-1.44.2.38,1.07,1.48-.21Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M83.94,171.54l.18.47,1.35-.17-.19-.5Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M87.54,168.06l1.06-.15-.15-.35-1,.15Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M81.13,168.93l1.37-.19-.12-.3-1.35.2Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M84.48,168.47l1.23-.17-.13-.32-1.23.18Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M82.81,168.7l1.35-.19L84,168.2l-1.35.2Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M79.45,169.16l1.36-.19-.1-.29-1.36.2Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M79.14,169.2l-.1-.28-.92.14.08.26Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M80.21,172.49l-.13-.42-1,.14.13.4Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M88.91,167.87l1.13-.15-.19-.36-1.08.15Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M78.57,170.54l1-.14-.29-.9-.95.13Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M89.78,170.72l-1.21.17.2.55,1.25-.15Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M86,168.26l1.2-.16-.12-.34-1.2.17Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M83.62,171.58l-1.5.21.16.44,1.53-.18Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M86.76,171.14l-1.16.16.19.51,1.17-.15Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M87.64,168.35l.32.87,1.12-.15-.36-.86Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M90.82,169.13l-1.29.18.44,1.07,1.41-.2Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls6}
                            d="M89.4,169l1.26-.18L90.2,168l-1.16.15Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls4}
                            d="M94.58,172.13l1.08-17.86-4.22-2.42-.72,14.61Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls18}
                            d="M92.11,153.57l-.56,12.71,2.16,3.09.77-14.21Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls4}
                            d="M83.5,163.73a1.59,1.59,0,0,1,.81,0,1.62,1.62,0,0,1,.71.4c.84.67,2.66,2.18,2.43,2.56s-.53.37-1-.08Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls10}
                            d="M81.59,163.74s1.39-.52,1.91,0,3.89,3.2,3.63,3.71-.69.08-1.24.08S81.59,163.74,81.59,163.74Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls10}
                            d="M74.68,167.46s-.94-.69,1-1.9,4.41-2.25,5.28-2.16,4.94,4.14,4.94,4.14a.78.78,0,0,1,0,.22.66.66,0,0,1-.06.2.45.45,0,0,1-.13.17.72.72,0,0,1-.19.11c-.52.17-3.8-2.25-4.4-2.25s-2.6,1.23-3.2,1.38S76,168.58,74.68,167.46Z"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls19}
                            d="M78.12,166.16s4.57,1.73,4.83,1.73-.08.69-.86.78-2.68-.95-3.37-.62a8.54,8.54,0,0,1-3.12.21c-1,0-1-1.24-1-1.24"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls9}
                            d="M78.12,166.16s4.57,1.73,4.83,1.73-.08.69-.86.78-2.68-.95-3.37-.62a8.54,8.54,0,0,1-3.12.21c-1,0-1-1.24-1-1.24"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls20}
                            d="M50.4,169.6s-4-2.78-8-1.57-3,6.64-.12,12.31,14.6,16.77,16.53,18,3.75,0,5.19-2.29,4.71-15.93,5.68-18.11,1.44-3.49,1.44-3.49a10.22,10.22,0,0,0,3-1.33L77,170.92s4.32-1.81,4.7-2-.11-.61-.61-.61h-5.4c-2.42,0-5.56,2.65-6.64,3.86s-8.69,15.2-8.69,15.2l-9.8-13.38"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls9}
                            d="M50.4,169.6s-4-2.78-8-1.57-3,6.64-.12,12.31,14.6,16.77,16.53,18,3.75,0,5.19-2.29,4.71-15.93,5.68-18.11,1.44-3.49,1.44-3.49a10.22,10.22,0,0,0,3-1.33L77,170.92s4.32-1.81,4.7-2-.11-.61-.61-.61h-5.4c-2.42,0-5.56,2.65-6.64,3.86s-8.69,15.2-8.69,15.2l-9.8-13.38"
                            transform="translate(0 -19.5)"
                        />
                        <path
                            className={classes.cls10}
                            d="M77,170.91s4.32-1.81,4.7-2-.11-.62-.61-.62h-5.4c-2.42,0-5.56,2.66-6.64,3.86a50.93,50.93,0,0,0-2.91,4.79l3.53,1.27a1.27,1.27,0,0,1,.11-.26c1-2.18,1.44-3.5,1.44-3.5a9.84,9.84,0,0,0,3-1.33Z"
                            transform="translate(0 -19.5)"
                        />
                    </g>
                    <g
                        className={classes.linkBoxGroup}
                        id="Link_Box_Group"
                        data-name="Link Box Group"
                    >
                        <path
                            id="Line"
                            className={[classes.cls2, classes.linkBox].join(
                                ' '
                            )}
                            d="M93.06,89.58v52.47"
                            transform="translate(0 -19.5)"
                        />
                        <Link href="/github">
                            <g id="Link_BOX" data-name="Link BOX">
                                <path
                                    id="Box_BG"
                                    data-name="Box BG"
                                    className={classes.cls21}
                                    d="M202,64.29H14.42a2.78,2.78,0,0,0-2.78,2.78v19.1A2.78,2.78,0,0,0,14.42,89H202a2.78,2.78,0,0,0,2.78-2.78V67.07A2.78,2.78,0,0,0,202,64.29Z"
                                    transform="translate(0 -19.5)"
                                />
                                <path
                                    id="Link_SVG_BG"
                                    data-name="Link SVG BG"
                                    className={classes.cls6}
                                    d="M177.33,64.29H202a2.76,2.76,0,0,1,2,.81,2.81,2.81,0,0,1,.82,2v19.1a2.79,2.79,0,0,1-.82,2,2.76,2.76,0,0,1-2,.81H177.33Z"
                                    transform="translate(0 -19.5)"
                                />
                                <path
                                    id="Stroke"
                                    className={classes.cls9}
                                    d="M202,64.29H14.42a2.78,2.78,0,0,0-2.78,2.78v19.1A2.78,2.78,0,0,0,14.42,89H202a2.78,2.78,0,0,0,2.78-2.78V67.07A2.78,2.78,0,0,0,202,64.29Z"
                                    transform="translate(0 -19.5)"
                                />
                                <g id="Link_SVG" data-name="Link SVG">
                                    <path
                                        className={classes.cls22}
                                        d="M189.33,78.15a2.86,2.86,0,0,0,1,.65,2.92,2.92,0,0,0,1.13.22,2.84,2.84,0,0,0,2.08-.87l3.33-3.33a3,3,0,0,0,.87-2.09,2.91,2.91,0,0,0-.87-2.08,2.95,2.95,0,0,0-4.16,0l-.42.42"
                                        transform="translate(0 -19.5)"
                                    />
                                    <path
                                        className={classes.cls22}
                                        d="M192.67,74.82a2.86,2.86,0,0,0-1-.65,2.93,2.93,0,0,0-1.13-.23,3,3,0,0,0-1.13.23,2.93,2.93,0,0,0-.95.65l-3.33,3.33a2.91,2.91,0,0,0-.87,2.08,2.95,2.95,0,0,0,5,2.09l.42-.42"
                                        transform="translate(0 -19.5)"
                                    />
                                </g>
                                <g id="Stars">
                                    <path
                                        id="Star2"
                                        className={classes.cls23}
                                        d="M184.9,71.76l-.82-.32H184s0,0-.06,0a.11.11,0,0,0,0,.07.09.09,0,0,0,0,.07l.22.88-.58.71h0s0,.05,0,.07a.14.14,0,0,0,0,.07.13.13,0,0,0,0,.06l.06,0,.89,0,.46.76h0l.06,0h.07l.06,0a.18.18,0,0,0,0-.07l.32-.86.87-.24h0l.06,0,0-.07a.17.17,0,0,0,0-.07l0-.06-.69-.55.08-.91a.19.19,0,0,0,0-.07s0,0,0-.06l-.07,0-.08,0Z"
                                        transform="translate(0 -19.5)"
                                    />
                                    <path
                                        id="Star1"
                                        className={classes.cls23}
                                        d="M180.79,71.41l-.54.24h0l0,0a.07.07,0,0,0,0,0s0,0,0,0a.08.08,0,0,0,0,0l.51.3.07.61h0a.08.08,0,0,0,0,.05l0,0h.05l0,0,.43-.41.57.14H182a.05.05,0,0,0,0,0,.06.06,0,0,0,0,0,.07.07,0,0,0,0,0l-.25-.56.3-.53h0a.11.11,0,0,0,0,0,.08.08,0,0,0,0-.05l0,0h0l-.59.07-.39-.47,0,0H181s0,0-.05,0a.08.08,0,0,0,0,0Z"
                                        transform="translate(0 -19.5)"
                                    />
                                    <path
                                        id="Star4"
                                        className={classes.cls23}
                                        d="M196.32,83.89l.32-.83h0a.17.17,0,0,0,0-.07.1.1,0,0,0-.1-.1h-.07l-.87.22-.72-.58h0l-.07,0a.08.08,0,0,0-.07,0l-.06,0a.14.14,0,0,0,0,.07l0,.88-.75.46h0a.21.21,0,0,0,0,.06.17.17,0,0,0,0,.07.16.16,0,0,0,0,.07.09.09,0,0,0,.06,0l.86.33.24.86v0l.05.06.07,0h.07l.06,0,.55-.69.91.08.07,0a.1.1,0,0,0,.06,0,.19.19,0,0,0,0-.07l0-.07Z"
                                        transform="translate(0 -19.5)"
                                    />
                                    <path
                                        id="Star3"
                                        className={classes.cls23}
                                        d="M196.67,79.77l-.24-.53h0a.08.08,0,0,0,0,0h0l0,0s0,0,0,0l-.3.52-.61.06h0l-.05,0,0,0v0a.05.05,0,0,0,0,0l.41.43-.14.57h0a.07.07,0,0,0,0,0s0,0,0,0h0s0,0,.05,0l.56-.26.53.3h0l.05,0s0,0,0,0a.11.11,0,0,0,0,0l-.07-.59.47-.39,0,0v0s0,0,0,0,0,0,0,0Z"
                                        transform="translate(0 -19.5)"
                                    />
                                </g>
                                <path
                                    id="Url"
                                    className={classes.cls6}
                                    d="M23.55,74.14a2.39,2.39,0,0,1,2.05,1.08,5.3,5.3,0,0,1,.79,3.15A6.52,6.52,0,0,1,26,80.73a3.11,3.11,0,0,1-1,1.42,2.55,2.55,0,0,1-1.52.48,2.59,2.59,0,0,1-.93-.15,2.14,2.14,0,0,1-.66-.39,3.57,3.57,0,0,1-.45-.51h-.1c0,.19.05.39.07.6s0,.4,0,.6v3.3H19V74.29H21l.35,1.07h.1a2.75,2.75,0,0,1,.48-.6,2.06,2.06,0,0,1,.69-.45A2.53,2.53,0,0,1,23.55,74.14Zm-.86,1.79a1.16,1.16,0,0,0-.75.24,1.32,1.32,0,0,0-.4.73,5.17,5.17,0,0,0-.12,1.22v.24a6.5,6.5,0,0,0,.12,1.35,1.62,1.62,0,0,0,.4.82,1.1,1.1,0,0,0,.79.29.88.88,0,0,0,.67-.29,1.84,1.84,0,0,0,.41-.84,5.82,5.82,0,0,0,.13-1.35,4,4,0,0,0-.32-1.8A1,1,0,0,0,22.69,75.93Zm9.82-1.79.42,0a2.27,2.27,0,0,1,.35,0l-.2,2.1-.31,0a3,3,0,0,0-.45,0,2.08,2.08,0,0,0-.68.12,1.76,1.76,0,0,0-.61.34,1.88,1.88,0,0,0-.45.65,2.48,2.48,0,0,0-.17,1v4.17H28V74.29h1.8l.36,1.38h.12a3.47,3.47,0,0,1,.56-.76,2.72,2.72,0,0,1,.75-.56A2.06,2.06,0,0,1,32.51,74.14ZM39,76H37.29v6.51h-2.4V76H33.8V74.89l1.12-.6v-.6a3.54,3.54,0,0,1,.3-1.62,1.68,1.68,0,0,1,.9-.82A4,4,0,0,1,37.61,71a5.39,5.39,0,0,1,1.11.1,9.2,9.2,0,0,1,.91.24L39.08,73a5.07,5.07,0,0,0-.5-.14,2,2,0,0,0-.57-.07.6.6,0,0,0-.55.28,1.42,1.42,0,0,0-.17.72v.51H39Zm.53,5.46a1.09,1.09,0,0,1,.39-1,1.57,1.57,0,0,1,.95-.28,1.49,1.49,0,0,1,.91.28,1.09,1.09,0,0,1,.39,1,1.13,1.13,0,0,1-.39,1,1.5,1.5,0,0,1-.91.29,1.58,1.58,0,0,1-.95-.29A1.13,1.13,0,0,1,39.56,81.43Zm6.76-7.14v8.19h-2.4V74.29Zm-1.18-3.21a1.63,1.63,0,0,1,.9.24A1.17,1.17,0,0,1,46,73a1.63,1.63,0,0,1-.9.24,1.68,1.68,0,0,1-.92-.24,1.17,1.17,0,0,1,0-1.71A1.68,1.68,0,0,1,45.14,71.08ZM53,74.14a2.74,2.74,0,0,1,2,.72,3,3,0,0,1,.77,2.28v5.34h-2.4V77.7a2.55,2.55,0,0,0-.27-1.32.88.88,0,0,0-.83-.45,1.15,1.15,0,0,0-1.17.7,5.22,5.22,0,0,0-.3,2v3.85h-2.4V74.29h1.82l.33,1h.1a2.3,2.3,0,0,1,.6-.67,2.34,2.34,0,0,1,.81-.39A3.32,3.32,0,0,1,53,74.14Zm7.14,2c0,.31,0,.62,0,.93s0,.61-.09.92h0a2.06,2.06,0,0,1,.21-.42l.32-.42.34-.41,2-2.49h2.68l-2.89,3.56,3.06,4.63H63l-2-3.31-.89.76v2.55h-2.4V71.08h2.4Zm11.57-4.41L67.94,82.48H65.8l3.75-10.71Zm3.57,2.37a2.56,2.56,0,0,1,1.29.3,2.31,2.31,0,0,1,.88.9h.06l.18-1h2.06V82.5a3.92,3.92,0,0,1-.45,2A2.76,2.76,0,0,1,78,85.66a5.24,5.24,0,0,1-2.24.42,11.1,11.1,0,0,1-1.59-.1,5.85,5.85,0,0,1-1.36-.38V83.82a8.15,8.15,0,0,0,.93.34,5.1,5.1,0,0,0,.94.21,7.16,7.16,0,0,0,1.07.08A1.49,1.49,0,0,0,76.92,84a2.06,2.06,0,0,0,.41-1.39v-.17c0-.17,0-.34,0-.52s0-.34.06-.48h-.07a2.11,2.11,0,0,1-.86.93,2.55,2.55,0,0,1-1.26.28,2.42,2.42,0,0,1-2.08-1.11,5.49,5.49,0,0,1-.77-3.12,6.44,6.44,0,0,1,.36-2.29,3.21,3.21,0,0,1,1-1.46A2.43,2.43,0,0,1,75.26,74.14ZM76.1,76a1,1,0,0,0-.72.28,1.76,1.76,0,0,0-.44.83,5.74,5.74,0,0,0-.13,1.36,4.23,4.23,0,0,0,.31,1.85,1.08,1.08,0,0,0,1,.6,1.58,1.58,0,0,0,.61-.11,1,1,0,0,0,.44-.37,2,2,0,0,0,.24-.69,5,5,0,0,0,.09-1v-.27A6.09,6.09,0,0,0,77.37,77a1.35,1.35,0,0,0-.45-.78A1.22,1.22,0,0,0,76.1,76Zm8.06-1.67v8.19h-2.4V74.29ZM83,71.08a1.63,1.63,0,0,1,.9.24,1.15,1.15,0,0,1,0,1.71,1.83,1.83,0,0,1-1.81,0,1.15,1.15,0,0,1,0-1.71A1.65,1.65,0,0,1,83,71.08Zm6.75,9.77a2.71,2.71,0,0,0,.66-.08l.65-.18v1.67a5.34,5.34,0,0,1-.89.25,5,5,0,0,1-1.17.12,3.3,3.3,0,0,1-1.29-.24,1.77,1.77,0,0,1-.87-.82,3.59,3.59,0,0,1-.31-1.65V76h-1V75l1.17-.75.66-1.73H88.9v1.74h2V76h-2v4a1,1,0,0,0,.22.7A.81.81,0,0,0,89.72,80.85Zm5.18-7.44c0,.4,0,.78-.05,1.15s0,.63-.06.78h.12a2.55,2.55,0,0,1,.57-.67,2.11,2.11,0,0,1,.74-.39,2.74,2.74,0,0,1,.87-.14,3.06,3.06,0,0,1,1.42.32,2.26,2.26,0,0,1,1,1,3.56,3.56,0,0,1,.36,1.71v5.34H97.45V77.7a2.55,2.55,0,0,0-.27-1.32.86.86,0,0,0-.81-.45,1.24,1.24,0,0,0-.89.31,1.78,1.78,0,0,0-.46.92,7.64,7.64,0,0,0-.12,1.47v3.85H92.5V71.08h2.4Zm14.28.88v8.19h-1.82l-.31-1h-.14a2.14,2.14,0,0,1-.61.69,2.51,2.51,0,0,1-.81.38,3.22,3.22,0,0,1-.93.13,3,3,0,0,1-1.41-.31,2.32,2.32,0,0,1-1-1,3.69,3.69,0,0,1-.34-1.71V74.29h2.4v4.79a2.74,2.74,0,0,0,.25,1.32.88.88,0,0,0,.83.45,1.22,1.22,0,0,0,.9-.32,1.72,1.72,0,0,0,.43-.91,6.78,6.78,0,0,0,.14-1.47V74.29Zm4.44-.55c0,.31,0,.61,0,.91s0,.54-.06.71h.09a2.7,2.7,0,0,1,.79-.86,2.28,2.28,0,0,1,1.34-.36,2.43,2.43,0,0,1,2,1.08,5.23,5.23,0,0,1,.79,3.15,6.53,6.53,0,0,1-.37,2.36,3,3,0,0,1-1,1.42,2.48,2.48,0,0,1-1.52.48,2.28,2.28,0,0,1-1.29-.31,3.35,3.35,0,0,1-.76-.74h-.17l-.37.9h-1.86V71.08h2.4Zm1.29,2.19a1.12,1.12,0,0,0-.74.24,1.4,1.4,0,0,0-.42.73,4.64,4.64,0,0,0-.13,1.22v.24a4.68,4.68,0,0,0,.28,1.83,1,1,0,0,0,1,.63,1,1,0,0,0,.88-.63,4.33,4.33,0,0,0,.32-1.85,4,4,0,0,0-.32-1.8A1,1,0,0,0,114.91,75.93Z"
                                    transform="translate(0 -19.5)"
                                />
                            </g>
                        </Link>
                    </g>
                </svg>
                <ThemeToggle />
            </div>
        </div>
    );
}
