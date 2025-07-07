
import RegionSelector from "@@/layout/index/otherPage/RegionSelector"
// import {useEffect, useState} from "react";


export default function Help() {
    // const [value, setValue] = useState<string[]>([]);
    //
    // useEffect(() => {
    //     console.log('新的值:', value);
    // }, [value]); // 当 value 变化时，这个 effect 会运行

    return (
        <div className="select">
            <div>
                <div className="select-label">
                    {/*setValue={setValue}*/}
                    <RegionSelector  />
                </div>
                <div className="helpContainer"></div>
            </div>
        </div>
    );
}