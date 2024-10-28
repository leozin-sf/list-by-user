import { Skeleton, SkeletonText, SkeletonButton } from './styles';

export function TaskLoading() {
  return (
    <Skeleton>
      <SkeletonText />
      <SkeletonButton />
      <SkeletonButton />
      <SkeletonButton />
    </Skeleton>
  );
}
