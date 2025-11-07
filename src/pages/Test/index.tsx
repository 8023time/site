import React from 'react';

const Father: React.FC = () => {
  return (
    <>
      <label>
        密码:
        <input type='password' aria-describedby='password-hint' />
      </label>
      <p id='password-hint'>密码应该包含至少 18 个字符</p>
    </>
  );
};

export default Father;
