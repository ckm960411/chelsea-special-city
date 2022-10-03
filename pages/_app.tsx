import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import MeProvider from '../components/common/MeProvider';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RecoilRoot>
      <MeProvider>
        <div className="font-pretendard">{getLayout(<Component {...pageProps} />)}</div>
      </MeProvider>
    </RecoilRoot>
  );
};

export default MyApp;
