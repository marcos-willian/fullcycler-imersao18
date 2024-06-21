"use client";
import { handleSelect } from '@/domain/actions'


interface SpotSeatProps {
    spotName: string;
    spotLabel: string;
    eventId: string;
    selected: boolean;
    disabled: boolean;
}

export const SpotSeat = ({
    spotName,
    spotLabel,
    eventId,
    selected,
    disabled,
}: SpotSeatProps) => {
    return (
        <div className="flex">
            <input
                type="checkbox"
                name={`spots`}
                id={`spot-${spotName}`}
                className="peer hidden"
                value={spotName}
                disabled={disabled}
                defaultChecked={selected}
                onChange={(event) => handleSelect(
                    event.target.checked,
                    eventId,
                    spotName)}
            />
            <label
                htmlFor={`spot-${spotName}`}
                className="m-1 h-6 w-6 cursor-pointer select-none
                            rounded-full bg-[#00A96E] py-1 text-center
                            text-[10px] text-black
                            peer-checked:bg-[#7480FF]
                            peer-disabled:cursor-default
                            peer-disabled:bg-[#A6ADBB]">
                {spotLabel}
            </label>
        </div>
    );
};