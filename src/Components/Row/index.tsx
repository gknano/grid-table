import React, { useEffect, FC } from 'react';
import { RowProps, ExternalTProps, Column, RowWrapper, HoverButton } from '../';
import { tableSvc } from '../services/services';
import { useObservable } from '../customHooks/ObservableHook/observableHook';
import './row.scss';

export type IRowProps<T = ExternalTProps> = FC<RowProps<T>>;

export const Row: IRowProps = function (props) {
    const { hoverButton = null, ...rest } = props;
    const { columns, data, isCounter } = useObservable(tableSvc.State);
    const addHoverButton = () => {
        columns.push({
            title: '',
            key: 'hover-button',
            dataIndex: 'hoverButton',
            toRender: ({ index, record, renderedData }) => (
                <HoverButton
                    className='hover-btn'
                    renderedData={renderedData}
                    record={record}
                    rowIndex={index}
                    {...hoverButton}
                />
            ),
        });
    };
    const addRowCounter = () => {
        columns!.unshift({
            title: '\u{2116}',
            key: 'isCounter',
            dataIndex: 'isCounter',
            toRender: ({ index }) => <span>{index}</span>,
        });
    };
    useEffect(() => {
        if (hoverButton && !columns.find(el => el.key === 'hover-button')) {
            addHoverButton();
            tableSvc.setTableState({ columns });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columns, hoverButton]);
    useEffect(() => {
        if (isCounter && !columns!.find(el => el.key === 'isCounter')) {
            addRowCounter();
            tableSvc.setTableState({ columns });
        }
    }, [columns, isCounter]);

    function renderRow(record: unknown, index: number) {
        return columns.map((column, i) => (
            <Column column={column} record={record} rowIndex={index} key={`${column.key}${i}`} />
        ));
    }

    return (
        <>
            {[...data].map((record, index) => (
                <RowWrapper record={record} index={index} {...rest}>
                    {renderRow(record, index)}
                </RowWrapper>
            ))}
        </>
    );
};
