import React from 'react';
import DeliveryDashBoard from '@/app/companyui/delivery';
import SettingsDashBoard from '@/app/companyui/settings';
import TrackingDashBoard from '@/app/companyui/tracking';
import VehicleDashBoard from '@/app/companyui/vehicle';
import Report from '@/app/companyui/reports';
import Drivers from '@/app/companyui/drivers';
import { use } from 'react';
import CompanyDashBoard from '@/app/component/dasboard';
import { usePathname } from 'next/navigation';
const CompanyPage = (
    {
        params,
    }: {
        params: Promise<{ service: string }>
    }
) => {
    const { service } = use(params);
    const [clientPathname, setClientPathname] = React.useState('')
    const pathname = usePathname();
    React.useEffect(() => {
        setClientPathname(pathname)
    }, [pathname])


    if (service === 'drivers') {
        return <Drivers />;
    } else if (service === 'delivery') {
        return <DeliveryDashBoard />;
    } else if (service === 'report') {
        return <Report />;
    } else if (service === 'settings') {
        return <SettingsDashBoard />;
    } else if (service === 'tracking') {
        return <TrackingDashBoard />;
    };




    return (
        <div>
            {/* <CompanyDashBoard /> */}
            <p>{pathname}</p>

        </div>
    )
}

export default CompanyPage

