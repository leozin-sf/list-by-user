import { DotContainer, DotLeft, DotRight, DotTop1, DotTop2 } from './styles';

export function Loading({ loading }: { loading: boolean }) {
  return (
    <DotContainer loading={loading}>
      <DotTop1 />
      <DotTop2 />
      <DotLeft />
      <DotRight />
    </DotContainer>
  );
}
