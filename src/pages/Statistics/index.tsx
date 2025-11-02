const Statistics = () => {
  return (
    <div className="relative w-full h-screen bg-neutral-50 dark:bg-neutral-900 pt-20">
      <iframe
        src="https://cloud.umami.is/share/wRdNzgP3nlS5q0UT"
        title="访问统计面板"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full border-0 rounded-xl shadow-inner transition-all duration-300"
        allowFullScreen
      />
    </div>
  );
};

export default Statistics;
