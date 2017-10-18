# node-red-contrib-mongoose-os-rpc
A node for calling functions via RPC on Mongoose OS enabled devices (ESP8266 etc.) in NodeRED

## Overview
This node connects to a Mongoose OS enabled device, executes given function by its name (optionally passing arguments) then returns function's result (asynchronously).

The <code>address</code> property has the following format depending of the transport being used:

* <code>http://deviceIpOrDnsName/rpc</code> - when using HTTP transport
* <code>&nbsp;&nbsp;ws://deviceIpOrDnsName/rpc</code> - when using WebSocket transport</code>
* <code>mqtt://deviceIpOrDnsName/device_id</code> - when using MQTT transport

The function can be specified dynamically via input message where <code>topic</code> is function's name and <code>payload</code> contains the arguments (JSON string or JSON object).

## Error handling
To handle RPC related errors (timeouts, unsupported commands etc.) you need to put a Catch node in your flow. The <code>payload</code> of the Catch node will contain error's object:

<code>{code: xyz, message: "specific error message"}</code>

The <code>code</code> property maps to standard http error codes.

All transport errors are reported via node.error and will be recorded in NodeRED's log (i.e. they will not reach any Catch node).

## References

* [Mongoose OS installation and configuration](https://mongoose-os.com/docs/quickstart/setup.html)
* [Mongoose OS RPC protocol specs](https://github.com/mongoose-os-libs/rpc-common)
* [Mongoose OS RPC - Remote Procedure Calls](https://mongoose-os.com/docs/book/rpc.html)
* [Mongoose OS RPC node.js package](https://github.com/PKGeorgiev/mongoose-os-rpc)
