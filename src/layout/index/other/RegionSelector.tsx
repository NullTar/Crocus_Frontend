// import region from '@@/assets/json/regionsData.json';
import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';

import React from "react";

// type Region = {
//     id: number | string;
//     name: string;
//     children?: Region[];
// }

// type ArraySelectProps = {
//     array: Region[];
//     label: string;
//     onChange: () => void; // 添加onChange prop
//     value: string | null | undefined;
// };


const ArraySelect: React.FC = () => {
    return (
        <>
            {/*// <InputLabel>{label}</InputLabel>*/}
            {/* TODO('添加必要的属性，以免出问题')*/}
               
        </>
    )
}


export default function RegionSelector() {
    // 语言文件
    const translations = useTranslation();
    // 国家地址
    // const country: Region[] = region
    
    // const [province, setProvince] = useState<Region[] | null>();
    // const [area, setArea] = useState<Region[] | null>();
    // const [city, setCity] = useState<Region[] | null>();
    //
    // const [selectedCountry, setSelectedCountry] = useState<string | null>();
    // const [selectedProvince, setSelectedProvince] = useState<string | null>();
    // const [selectedArea, setSelectedArea] = useState<string | null>();
    // const [selectedCity, setSelectedCity] = useState<string | null>();
    // const [tip, setTip] = useState<string | null>();


    return (
        <>
            <div className="selected">
                {/* label 在translations.help里*/}
                <ArraySelect />
                <button className="subButton"
                >
                    {translations.help.button}
                </button>
            </div>
            {/*<p>{tip}</p>*/}
        </>
    );
}