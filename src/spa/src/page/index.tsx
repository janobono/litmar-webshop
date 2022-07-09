import React from 'react';
import { ContentLayout } from '../component/layout';
import { useGlobalState } from '../context/global-state-context-provider';
import { Spinner } from '../component/ui/spinner';

const IndexPage: React.FC = () => {
    const globalState = useGlobalState();

    return (
        <ContentLayout>
            <div className="flex flex-col text-gray-900">
                {globalState.companyInfo ?
                    <>
                        <p className="text-center text-base p-4">
                            {globalState.companyInfo.welcomeText}
                        </p>
                        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 p-4">
                            {
                                globalState.companyInfo.welcomeInfo.map((value, index) =>
                                    <div key={index} className="flex flex-row items-center">
                                        <img src={value.image} alt="01"
                                             className="h-[70px] w-[100px] min-w-[100px] pr-4"/>
                                        <div className="flex-1 text-sm text-justify">
                                            {value.text}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div
                            className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 justify-center">
                            <div className="flex flex-col p-4">
                                <iframe className="w-full aspect-square w-auto h-[200px]"
                                        src={globalState.companyInfo.map}></iframe>
                            </div>
                            <div className="flex flex-col py-4">
                                <h3 className="text-center text-l font-bold"
                                >Otváracie hodiny</h3>
                                <div className="flex flex-col text-sm p-4">
                                    {
                                        globalState.companyInfo.openingInfo.map((value, index) =>
                                            <div key={index} className="flex flex-row">
                                                <div className="basis-3/6 px-1 text-left">
                                                    {value.day}
                                                </div>
                                                <div className="basis-1/6 text-right">
                                                    {value.from}
                                                </div>
                                                <div className="basis-1/6 text-center">
                                                    -
                                                </div>
                                                <div className="basis-1/6 text-left">
                                                    {value.to}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col p-4 text-sm">
                                <div className="grid grid-cols-2 gap-4 py-2">
                                    <div className="text-right">IČO:</div>
                                    <div>{globalState.companyInfo.businessId}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-2">
                                    <div className="text-right">DIČ:</div>
                                    <div>{globalState.companyInfo.taxId}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 py-2">
                                    <div className="text-right">IČ DPH:</div>
                                    <div>{globalState.companyInfo.vatRegNo}</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 text-center text-base">
                            {globalState.companyInfo.companyInfo}
                        </div>
                    </>
                    :
                    <div className="flex flex-1 justify-center items-center">
                        <Spinner/>
                    </div>
                }
            </div>
        </ContentLayout>
    );
}

export default IndexPage;
