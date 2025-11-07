const Statistics = () => {
  return (
    <div className='relative h-screen w-full bg-neutral-50 pt-20 dark:bg-neutral-900'>
      <iframe
        src='https://cloud.umami.is/share/wRdNzgP3nlS5q0UT'
        title='访问统计面板'
        loading='lazy'
        sandbox='allow-scripts allow-same-origin allow-popups allow-forms'
        referrerPolicy='no-referrer-when-downgrade'
        className='h-full w-full rounded-xl border-0 shadow-inner transition-all duration-300'
        allowFullScreen
      />
    </div>
  );
};

export default Statistics;
