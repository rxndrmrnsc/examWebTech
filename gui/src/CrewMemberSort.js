import { useEffect, useState } from 'react';
import './CrewMemberSort.css'

function CrewMemberForm(props) {
    const { onSort } = props;
    const [isSorted, setSorted] = useState(false);

    const sort = (isTrue) => {
        setSorted(isTrue);
        onSort(isTrue);
    }

    return (
        <div className="crew-sort">
            {
                isSorted ? (
                    <div className='sort'>
                        <input type='button' value='Sort based on default order' onClick={() => sort(false)} />
                    </div>
                ) : (
                    <div className='sort'>
                        <input type='button' value='Sort based on name' onClick={() => sort(true)} />
                    </div>

                )
            }
        </div>
    )
}

export default CrewMemberForm;