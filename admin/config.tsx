import type { AdminConfig } from '@keystone-6/core/types';
import { KSProviders } from './components/KSProviders';
import './global.css'
import type { CSSProperties } from 'react';
import { TiArrowBack } from "react-icons/ti";
import { envs } from '../envs';

function CustomLogo () {
  return <h3><a href={envs.FRONTEND_URL}><TiArrowBack />  NextJS</a> {ksSVG}<span style={{color: '#2563eb'}}>6</span></h3>
}

export const components: AdminConfig['components'] = {
  Navigation: KSProviders,
  Logo: CustomLogo,
}

const stylesSVG = {
  display: "inline-block",
  width: "3rem",
  height: "2rem",
  margin: "0 0 4px 0",
  verticalAlign: "middle",
  fontFamily: `system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif`,
  fontSize: '700',
  fontWeight: '1.25rem'
} as CSSProperties

const ksSVG = <svg style={stylesSVG} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" className="css-1xrg3zo"><defs><linearGradient id="logo-a" x1="0%" x2="50%" y1="0%" y2="71.9%"><stop offset="0%" stopColor="#5AE8FA"></stop><stop offset="100%" stopColor="#2684FF"></stop></linearGradient></defs><path fill="url(#logo-a)" fillRule="evenodd" d="M290.1 47h117.5c17.8 0 24.3 1.9 30.8 5.3a36.3 36.3 0 0115.1 15.2c3.5 6.5 5.4 13 5.4 30.8v117.4c0 17.9-1.9 24.3-5.4 30.8a36.3 36.3 0 01-15.1 15.2c-6.5 3.4-13 5.3-30.8 5.3H290c-17.8 0-24.3-1.9-30.8-5.3a36.3 36.3 0 01-15.1-15.2c-3.5-6.5-5.3-13-5.3-30.8V98.3c0-17.9 1.8-24.3 5.3-30.8a36.3 36.3 0 0115.1-15.2c6.5-3.4 13-5.3 30.8-5.3zm11.8 56.8V218H327v-36.8l14.4-14.6 34.4 51.4h31.5l-49-69.1 44.7-45.1h-31.3L327 151v-47.3H302z" transform="translate(-238.9 -47)"></path></svg>

