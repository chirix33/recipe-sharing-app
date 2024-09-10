import { Sumana, Quicksand } from 'next/font/google';
import localFont from 'next/font/local';

export const playwrite = localFont({ src: '/fonts/Playwrite_CU/PlaywriteCU-VariableFont_wght.ttf' });
export const sumana = Sumana({ 
    weight: ["400", "700"],
    style: "normal",
    subsets: ["latin"] 
});
export const quicksand = Quicksand({ subsets: ["latin"] });

export const fonts = [sumana, quicksand, playwrite];