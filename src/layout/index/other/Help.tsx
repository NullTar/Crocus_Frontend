
import RegionSelector from "@@/layout/index/other/RegionSelector"
// import {useEffect, useState} from "react";


export default function Help() {
    // const [value, setValue] = useState<string[]>([]);
    //
    // useEffect(() => {
    //     console.log('新的值:', value);
    // }, [value]);

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