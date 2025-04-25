
import React from 'react';

interface TimeSlot {
  time: string;
  activity: string;
}

interface TeacherSchedule {
  name: string;
  role: string;
  slots: TimeSlot[];
}

const timeSlots = [
  '9.40', '10.30', '11.20', '12.10', '12.35', '13.00', '13.45'
];

const teacherSchedules: TeacherSchedule[] = [
  {
    name: 'Adriano Moreno',
    role: 'EF',
    slots: [
      { time: '9.40', activity: 'EF 1º' },
      { time: '10.30', activity: 'EF 2º' },
      { time: '11.20', activity: 'EF 3º' },
      { time: '12.10', activity: 'RECREO' },
      { time: '12.35', activity: 'H. LER' },
      { time: '13.00', activity: 'EF 4º' },
      { time: '13.45', activity: 'EF 5º' },
    ]
  },
  {
    name: 'Adriano Moreno',
    role: 'EF',
    slots: [
      { time: '9.40', activity: 'EF 1º' },
      { time: '10.30', activity: 'EF 2º' },
      { time: '11.20', activity: 'EF 3º' },
      { time: '12.10', activity: 'RECREO' },
      { time: '12.35', activity: 'H. LER' },
      { time: '13.00', activity: 'EF 4º' },
      { time: '13.45', activity: 'EF 5º' },
    ]
  }
];

const TeacherTimetable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* Header with time slots */}
        <div className="grid grid-cols-[250px_repeat(7,1fr)]">
          <div className="h-12"></div>
          {timeSlots.map((time) => (
            <div
              key={time}
              className="h-12 bg-scola-primary text-white font-semibold flex items-center justify-center"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Teacher rows */}
        {teacherSchedules.map((teacher, index) => (
          <div
            key={index}
            className="grid grid-cols-[250px_repeat(7,1fr)]"
          >
            {/* Teacher info */}
            <div className="p-4 bg-gray-50">
              <div className="font-semibold">{teacher.name}</div>
              <div className="text-gray-600">{teacher.role}</div>
            </div>

            {/* Time slots */}
            {teacher.slots.map((slot, slotIndex) => (
              <div
                key={slotIndex}
                className="p-2 border border-dashed border-scola-primary m-2 flex items-center justify-center text-sm"
              >
                {slot.activity}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherTimetable;
