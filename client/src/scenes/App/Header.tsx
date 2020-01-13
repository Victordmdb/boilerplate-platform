import React, { FunctionComponent, MutableRefObject } from 'react';
import SidenavLogo from 'components/Logo';
import Breadcrumbs from "./Breadcrumbs";

import { 
    EuiHeader,
    EuiHeaderSection,
    EuiHeaderSectionItem,
    EuiHeaderSectionItemButton,
    EuiShowFor,
    EuiIcon
} from "@elastic/eui";
import { CSSProperties } from 'styled-components';


type HeaderProps = {
    navRef : MutableRefObject<any>;
};

const headerStyle = {
    background: "linear-gradient(180deg,#00bdf2,#00b3f0 18%,#0066b3 77%,#004985)",
    position:"fixed",
    width:"100%",
    zIndex:1100
} as CSSProperties;

const Header : FunctionComponent<HeaderProps> = ({navRef}) => <>
    <EuiHeader style={headerStyle}>
        <EuiHeaderSection grow={false}>
            <EuiHeaderSectionItem border="right">
                <SidenavLogo/>
            </EuiHeaderSectionItem>
        </EuiHeaderSection>
        {/* <EuiHeaderSection side="center"> */}
            <Breadcrumbs/>
        {/* </EuiHeaderSection>   */}
        <EuiHeaderSection side="right">
            <EuiShowFor sizes={['xs', 's']}>
                <EuiHeaderSectionItem border="right">
                    <EuiHeaderSectionItemButton
                        aria-label = "Open nav"
                        onClick={() => navRef.current.toggleOpen()}>
                        <EuiIcon type="apps" href="#" size="l" />
                    </EuiHeaderSectionItemButton>
                </EuiHeaderSectionItem>
            </EuiShowFor>
        </EuiHeaderSection>
    </EuiHeader>
</>
export default Header;