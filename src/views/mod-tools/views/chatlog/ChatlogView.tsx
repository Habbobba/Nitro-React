import { UserProfileComposer } from '@nitrots/nitro-renderer';
import { FC } from 'react';
import { AutoSizer, List, ListRowProps, ListRowRenderer } from 'react-virtualized';
import { SendMessageHook } from '../../../../hooks';
import { ChatlogViewProps } from './ChatlogView.types';

export const ChatlogView: FC<ChatlogViewProps> = props =>
{
    const { record = null } = props;

    const getRowHeight = ({ index }) =>
    {
        const item = record.chatlog[index];

        if(item.message.length < 40) return 20;
        else if(item.message.length < 70) return 42;
        else return 62;
    };

    const rowRenderer: ListRowRenderer = (props: ListRowProps) =>
    {
        const item = record.chatlog[props.index];

        return (
            <div key={props.key} style={props.style} className="row chatlog-entry justify-content-start">
                <div className="col-md-auto text-center">{item.timestamp}</div>
                <div className="col-sm-2 justify-content-start username"><span className="fw-bold cursor-pointer" onClick={() => SendMessageHook(new UserProfileComposer(item.userId))}>{item.userName}</span></div>
                <div className="col justify-content-start h-100"><span className="text-break text-wrap h-100">{item.message}</span></div>
            </div>
        );
    }

    return (
        <>
            {record && <div className="chatlog-messages w-100 h-100 overflow-hidden">
                <div className="row align-items-start w-100">
                    <div className="col-md-auto text-center fw-bold">Time</div>
                    <div className="col-sm-2 username-label fw-bold">User</div>
                    <div className="col fw-bold">Message</div>
                </div>
                <div className="row w-100 h-100 chatlog">
                    <AutoSizer defaultWidth={400} defaultHeight={200}>
                        {({ height, width }) => 
                        {
                            return (
                                <List
                                    width={width}
                                    height={height}
                                    rowCount={record.chatlog.length}
                                    rowHeight={getRowHeight}
                                    className={'chatlog-container'}
                                    rowRenderer={rowRenderer} />
                            )
                        }
                        }
                    </AutoSizer>
                </div>
            </div>}
        </>
    );
}
