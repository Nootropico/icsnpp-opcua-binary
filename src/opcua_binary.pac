## opcua_binary.pac
##
## OPCUA Binary Protocol Analyzer
##
## Author:   Kent Kvarfordt
## Contact:  kent.kvarfordt@inl.gov
##
## Copyright (c) 2022 Battelle Energy Alliance, LLC.  All rights reserved.

%include zeek/binpac.pac
%include zeek/zeek.pac

%extern{
	#include "events.bif.h"
%}

analyzer OPCUA_Binary withcontext {
	connection: OPCUA_Binary_Conn;
	flow:       OPCUA_Binary_Flow;
};

# Our connection consists of two flows, one in each direction.
connection OPCUA_Binary_Conn(bro_analyzer: ZeekAnalyzer) {
	upflow   = OPCUA_Binary_Flow(true);
	downflow = OPCUA_Binary_Flow(false);
};

%include opcua_binary-protocol.pac

# Now we define the flow:
flow OPCUA_Binary_Flow(is_orig: bool) {
    flowunit = Msg_Header(is_orig) withcontext(connection, this);
};

%include opcua_binary-utilities.pac
%include opcua_binary-analyzer.pac
%include req-res-header/opcua_binary-req_res_header_analyzer.pac
%include secure-channel/opcua_binary-secure_channel_analyzer.pac
%include get-endpoints/opcua_binary-get_endpoints_analyzer.pac
%include create-session/opcua_binary-create_session_analyzer.pac
%include activate-session/opcua_binary-activate_session_analyzer.pac
%include browse/opcua_binary-browse_analyzer.pac
%include read/opcua_binary-read_analyzer.pac
%include create-subscription/opcua_binary-create_subscription_analyzer.pac
%include stubbed-out/opcua_binary-stubbed_out_service_analyzer.pac

