const Waves = () => {
  return (
    <div className='absolute right-0 bottom-0 left-0 w-full overflow-hidden leading-none'>
      <svg
        className='block h-32 w-full text-amber-50 dark:text-black'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 24 150 28'
        preserveAspectRatio='none'
        shapeRendering='auto'
        aria-label='首页横幅波浪'
      >
        <defs>
          <path
            id='gentle-wave'
            d='M-160 44c30 0 58-18 88-18s58 18 88 18
               58-18 88-18 58 18 88 18v44h-352z'
          ></path>
        </defs>
        <g className='parallax'>
          <use
            href='#gentle-wave'
            x='48'
            y='0'
            className='animate-[wave1_100s_linear_infinite] fill-current opacity-50'
          />
          <use
            href='#gentle-wave'
            x='48'
            y='3'
            className='animate-[wave2_90s_linear_infinite] fill-current opacity-70'
          />
          <use
            href='#gentle-wave'
            x='48'
            y='5'
            className='animate-[wave3_80s_linear_infinite] fill-current opacity-90'
          />
          <use
            href='#gentle-wave'
            x='48'
            y='7'
            className='animate-[wave4_75s_linear_infinite] fill-current opacity-100'
          />
        </g>
      </svg>

      <style>
        {`
          @keyframes wave1 {
            0% { transform: translate3d(-90px,0,0); }
            100% { transform: translate3d(85px,0,0); }
          }
          @keyframes wave2 {
            0% { transform: translate3d(-85px,0,0); }
            100% { transform: translate3d(90px,0,0); }
          }
          @keyframes wave3 {
            0% { transform: translate3d(-80px,0,0); }
            100% { transform: translate3d(95px,0,0); }
          }
          @keyframes wave4 {
            0% { transform: translate3d(-75px,0,0); }
            100% { transform: translate3d(100px,0,0); }
          }
        `}
      </style>
    </div>
  );
};

export default Waves;
