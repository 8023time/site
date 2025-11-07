import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className='loader'>
        <div className='wrapper'>
          <div className='catContainer'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 733 673' className='catbody'>
              <path
                fill='url(#catGradient)'
                d='M111.002 139.5C270.502 -24.5001 471.503 2.4997 621.002 139.5C770.501 276.5 768.504 627.5 621.002 649.5C473.5 671.5 246 687.5 111.002 649.5C-23.9964 611.5 -48.4982 303.5 111.002 139.5Z'
              />
              <path fill='url(#catGradient)' d='M184 9L270.603 159H97.3975L184 9Z' />
              <path fill='url(#catGradient)' d='M541 0L627.603 150H454.397L541 0Z' />
              <defs>
                <linearGradient id='catGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                  <stop offset='0%' stopColor='#4B5EAA' />
                  <stop offset='100%' stopColor='#7B8CDE' />
                </linearGradient>
              </defs>
            </svg>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 158 564' className='tail'>
              <path
                fill='#4B5EAA'
                d='M5.97602 76.066C-11.1099 41.6747 12.9018 0 51.3036 0V0C71.5336 0 89.8636 12.2558 97.2565 31.0866C173.697 225.792 180.478 345.852 97.0691 536.666C89.7636 553.378 73.0672 564 54.8273 564V564C16.9427 564 -5.4224 521.149 13.0712 488.085C90.2225 350.15 87.9612 241.089 5.97602 76.066Z'
              />
            </svg>
            <div className='text'>
              <span className='bigzzz'>Z</span>
              <span className='zzz'>Z</span>
              <span className='zzz small'>z</span>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%);
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  .wrapper {
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px; // 增加间距
  }

  .catContainer {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2)); // 添加猫咪阴影
  }

  .catbody {
    width: 120px; // 增大猫咪尺寸
    transition: transform 0.3s ease; // 添加轻微的悬浮动画
    &:hover {
      transform: scale(1.05); // 鼠标悬浮时放大
    }
  }

  .tail {
    position: absolute;
    width: 20px; // 增大尾巴尺寸
    top: 50%;
    transform-origin: top;
    animation: tail 0.6s ease-in-out infinite alternate;
  }

  @keyframes tail {
    0% {
      transform: rotateZ(45deg);
    }
    50% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(-30deg);
    }
  }

  .wallContainer {
    transform: scale(0.8); // 稍微缩小墙体以平衡布局
  }

  .wall {
    width: 350px; // 增大墙体尺寸
    stroke-linecap: round; // 圆滑线条
    filter (\#0000001);
  }

  .text {
    display: flex;
    flex-direction: column;
    width: 60px;
    position: absolute;
    margin: 0px 0px 120px 140px; // 调整文字位置
    gap: 5px; // 文字间距
  }

  .zzz {
    color: #ffffff; // 改为白色以适配深色背景
    font-weight: 700;
    font-size: 18px;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5); // 添加文字发光效果
    animation: zzz 2s ease-in-out infinite;
  }

  .bigzzz {
    color: #ffffff;
    font-weight: 700;
    font-size: 30px;
    margin-left: 10px;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
    animation: zzz 2.3s ease-in-out infinite;
  }

  .small {
    font-size: 14px; // 添加小号 “z” 文字
    animation-delay: 0.2s; // 错开动画时间
  }

  @keyframes zzz {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-10px); // 文字向上漂浮
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  // 响应式设计
  @media (max-width: 768px) {
    .catbody {
      width: 80px;
    }
    .tail {
      width: 15px;
    }
    .wall {
      width: 250px;
    }
    .text {
      margin: 0px 0px 80px 100px;
    }
    .zzz {
      font-size: 14px;
    }
    .bigzzz {
      font-size: 24px;
    }
    .small {
      font-size: 12px;
    }
  }
`;

export default Loader;
