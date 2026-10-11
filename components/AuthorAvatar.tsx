import Image from 'next/image';
import { AUTHOR, getAuthorPhoto } from '@/lib/author';

interface AuthorAvatarProps {
  size: number;
}

/** Author photo when public/images/umar-hashmi.* exists, otherwise initials. Server component. */
export default function AuthorAvatar({ size }: AuthorAvatarProps) {
  const photo = getAuthorPhoto();
  const initials = AUTHOR.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'inline-grid',
        placeItems: 'center',
        background: '#0f172a',
        color: '#ffffff',
        fontWeight: 700,
        fontSize: Math.round(size * 0.38),
        border: '1.5px solid #2563eb',
      }}
    >
      {photo ? (
        <Image src={photo} alt={AUTHOR.name} width={size} height={size} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span aria-label={AUTHOR.name}>{initials}</span>
      )}
    </span>
  );
}
