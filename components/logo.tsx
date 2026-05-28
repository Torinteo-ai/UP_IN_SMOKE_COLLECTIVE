type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo(_props: LogoProps = {}) {
  return (
    <div style={{
      width: '220px',
      height: '80px',
      background: 'red',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      fontWeight: 'bold',
      zIndex: 999999
    }}>
      TEST LOGO
    </div>
  )
}

export default Logo;
