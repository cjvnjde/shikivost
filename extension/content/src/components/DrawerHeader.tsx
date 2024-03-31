import { PropsWithChildren } from 'preact/compat';

type DrawerHeaderProps = PropsWithChildren<{
  onClose: () => void;
}>;

export function DrawerHeader({ children, onClose }: DrawerHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderBottom: '1px solid grey',
        padding: '8px 8px 12px',
        marginBottom: '8px',
      }}
    >
      <span
        style={{
          fontSize: '18px',
          display: 'block',
          marginRight: '24px',
        }}
      >
        {children}
      </span>
      <button
        type="button"
        onClick={onClose}
        style={{
          position: 'absolute',
          right: '8px',
          top: '8px',
          width: '24px',
          height: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '4px',
          border: '1px solid grey',
        }}
      >
        x
      </button>
    </div>
  );
}
