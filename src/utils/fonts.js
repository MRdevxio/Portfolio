import localFont from 'next/font/local' 
export const vazir = localFont({
    src: [
      {
        path: '../../public/fonts/Vazir.ttf',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../../public/fonts/Vazir-Thin.ttf',
        weight: '200',
        style: 'normal',
      },
      {
        path: '../../public/fonts/Vazir-Medium.ttf',
        weight: '500',
        style: 'normal',
      },
      {
        path: '../../public/fonts/Vazir-Bold.ttf',
        weight: '700',
        style: 'normal',
      },
      {
        path: '../../public/fonts/Vazir-FD-WOL.ttf',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../../public/fonts/Vazir-Bold-FD-WOL.ttf',
        weight: '700',
        style: 'normal',
      },
    
    ],
  })