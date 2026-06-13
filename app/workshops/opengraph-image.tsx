import { ImageResponse } from 'next/og';

export const alt = 'Reading Yogis workshop preview';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'stretch',
          background:
            'linear-gradient(135deg, #fff6e9 0%, #ffffff 46%, #f899b3 100%)',
          color: '#171e5d',
          display: 'flex',
          fontFamily: 'Arial, sans-serif',
          height: '100%',
          padding: '40px',
          width: '100%',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.88)',
            border: '2px solid rgba(23, 30, 93, 0.08)',
            borderRadius: '32px',
            boxShadow: '0 20px 60px rgba(23, 30, 93, 0.12)',
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(180deg, #171e5d 0%, #8390fa 100%)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '42px 38px',
              width: '37%',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.14)',
                borderRadius: '999px',
                display: 'flex',
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 4,
                padding: '12px 20px',
                textTransform: 'uppercase',
              }}
            >
              Workshop
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', fontSize: 66, fontWeight: 800, lineHeight: 1 }}>
                Reading Yogis
              </div>
              <div style={{ display: 'flex', fontSize: 28, lineHeight: 1.35, opacity: 0.95 }}>
                A playful early literacy workshop for children ages 3-5
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 24, gap: 8 }}>
              <div style={{ display: 'flex' }}>Speech on the Slope</div>
              <div style={{ display: 'flex', opacity: 0.9 }}>speechontheslope.com/workshops</div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              gap: 24,
              padding: '42px 40px',
            }}
          >
            <div
              style={{
                color: '#171e5d',
                display: 'flex',
                fontSize: 34,
                fontWeight: 800,
                lineHeight: 1.15,
              }}
            >
              Movement, yoga, music, and hands-on phonics fun
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <InfoRow label="Dates" value="Wednesdays July 1-August 12, 2026" />
              <InfoRow label="Sessions" value="7 sessions" />
              <InfoRow label="Time" value="3:45-4:25pm" />
              <InfoRow label="Location" value="Llamaste Yoga Studio, Brooklyn" />
              <InfoRow label="Price" value="$315 for the full series" />
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        alignItems: 'center',
        background: 'rgba(131, 144, 250, 0.08)',
        borderRadius: 22,
        display: 'flex',
        gap: 18,
        padding: '18px 22px',
      }}
    >
      <div
        style={{
          color: '#171e5d',
          display: 'flex',
          fontSize: 22,
          fontWeight: 800,
          minWidth: 110,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: '#2f3747',
          display: 'flex',
          fontSize: 24,
          lineHeight: 1.25,
        }}
      >
        {value}
      </div>
    </div>
  );
}
