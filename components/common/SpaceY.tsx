interface SpaceYProps {
  height: string | number;
}
const SpaceY = ({ height }: SpaceYProps) => {
  return <div className="w-full" style={{ height }} />;
};

export default SpaceY;
