import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";

function SidebarClusterView(props: any) {
    const containerRef = React.useRef<HTMLDivElement>(null);

    

    return(
        <div style={ { display:'inline-block', float: 'left',  width: '300px', height: '600px'  }}>
            <h1>
                sidebar
            </h1>
        </div>
    )
}

export default SidebarClusterView;