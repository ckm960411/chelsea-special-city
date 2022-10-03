interface SpaceYProps {
  height: string;
}
const SpaceY = ({ height }: SpaceYProps) => {
  return <div className="w-full" style={{ height }} />;
};

export default SpaceY;
