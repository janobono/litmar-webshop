import React from 'react';
import { useGlobalState } from '../context/global-state-context-provider';
import { LWSpinner } from '../component/ui/lw-spinner';

const IndexPage: React.FC = () => {
    const globalState = useGlobalState();

    return (
        <div className="flex flex-col">
            {globalState.companyInfo ?
                <>
                    <p className="text-justify m-4">
                        {globalState.companyInfo.welcomeText}
                    </p>
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 m-4">
                        {
                            globalState.companyInfo.welcomeInfo.map((value, index) =>
                                <div key={index} className="flex flex-row items-center">
                                    <img src={value.image} alt={'img' + index}
                                         className="h-[70px] w-[100px] min-w-[100px] pr-4"/>
                                    <p className="flex-1 text-xs text-justify">
                                        {value.text}
                                    </p>
                                </div>
                            )
                        }
                    </div>
                    <div
                        className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 justify-center m-4">
                        <div className="flex flex-col">
                            <iframe className="w-full aspect-square w-auto h-[200px]"
                                    src={globalState.companyInfo.map}></iframe>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="m-4">Otváracie hodiny</h3>
                            <div className="flex flex-wrap pl-4 pr-4 justify-center">
                                <table className="table-fixed">
                                    <tbody>
                                    {
                                        globalState.companyInfo.openingInfo.map((value, index) =>
                                            <tr key={index}>
                                                <td className="pr-4 text-left text-xs">
                                                    {value.day}
                                                </td>
                                                <td className="text-right text-xs">
                                                    {value.from}
                                                </td>
                                                <td className="text-center text-xs">
                                                    -
                                                </td>
                                                <td className="text-left text-xs">
                                                    {value.to}
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-4 mx-4">
                                <p className="text-right text-sm">IČO:</p>
                                <p className="text-sm">{globalState.companyInfo.businessId}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 m-4">
                                <p className="text-right text-sm">DIČ:</p>
                                <p className="text-sm">{globalState.companyInfo.taxId}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mx-4">
                                <p className="text-right text-sm">IČ DPH:</p>
                                <p className="text-sm">{globalState.companyInfo.vatRegNo}</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-center m-4">
                        {globalState.companyInfo.companyInfo}
                    </p>
                </>
                :
                <div className="flex flex-1 justify-center items-center">
                    <LWSpinner/>
                </div>
            }
        </div>
    );
}

export default IndexPage;
