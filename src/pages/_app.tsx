import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"/>
      </Head>
      <Global
        styles={css`
          *, *::before, *::after {
            box-sizing: border-box;
          }
          html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym,
          address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var,
          b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead,
          tr, th, td, article, aside, canvas, details, embed,  figure, figcaption, footer, header, hgroup,  menu, nav,
          output, ruby, section, summary, time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font: inherit;
            vertical-align: baseline;
          }
          article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
            display: block;
          }
          body {
            font-family: "Open Sans", sans-serif;
            overflow-x: hidden;
            overflow-y: scroll;
            line-height: 1.25;
          }
          ol, ul {
            list-style: none;
          }
          blockquote, q {
            quotes: none;
          }
          blockquote::before, blockquote::after, q::before, q::after {
            content: none;
          }
          table {
            border-collapse: collapse;
            border-spacing: 0;
          }
          select, button, input {
            margin: 0;
            padding: 0;
            border: 0;
            color: inherit;
            background: none;
            font: inherit;
            appearance: none;
          }
          button:not(:disabled):hover {
            cursor: pointer;
          }
          svg, img {
            vertical-align: middle;
          }
        `}
      />
      <Component {...pageProps}/>
    </>
  );
}
