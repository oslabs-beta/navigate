import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";

function SidebarNodeView(props: any) {
  return  (
    <div>
      <h1>{props.masterNode}</h1>
      <div id="sidebar">
    </div>
    </div>
  )
}

export default SidebarNodeView;