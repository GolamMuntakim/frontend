
import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center
      w-full `}
    >
      <ScaleLoader size={100} color='green' />
    </div>
  )
}


export default LoadingSpinner
