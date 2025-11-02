const randomPosition = () => {
  return {
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
  };
};

const Heart = ({ duration }: { duration: number }) => {
  return (
    <div
      className={`w-10 h-10 flex flex-wrap justify-center items-center absolute animation-floating `}
      style={{
        ...randomPosition(),
        animationDuration: `${duration}s`,
      }}
    >
      <div className='w-5 h-5 bg-red-300 rounded-tr-4xl rounded-tl-4xl rounded-bl-[42px] absolute top-0 left-0'></div>
      <div className='w-5 h-5 bg-red-300 rounded-tl-4xl rounded-tr-4xl rounded-br-[42px] absolute top-0 right-0'></div>
      <div
        className='w-[33.5px] h-4 bg-red-300 rotate-180 absolute bottom-[7.5px] left-[3.2px]'
        style={{
          clipPath: 'polygon(50% 0, 100% 100%, 0% 100%)',
        }}
      ></div>
    </div>
  );
};
export default function Home() {
  return (
    <div className='h-screen w-full flex justify-center items-center bg-amber-50 overflow-hidden relative'>
      {Array.from({ length: 100 }).map((_, index) => (
        <Heart key={index} duration={Math.random() * 1 + 1} />
      ))}
    </div>
  );
}
