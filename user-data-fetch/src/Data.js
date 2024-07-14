

function Data({label,info}) {

    return(
        <div className='flex py-1'>
            <h3 className='font-semibold text-lg sm:text-md pr-2 text-teal-700'>{label}: </h3>
            <p className='text-lg sm:text-md'>{info ? info : ''}</p>
        </div>
    );
}

export default Data;