#include <math.h>
#include <emscripten/emscripten.h>

// Keep this name/signature. Replace the math with your real formula later.
EMSCRIPTEN_KEEPALIVE
double well_recovery_rate(double static_head_m,
                          double drawdown_m,
                          double pump_rate_m3s,
                          double time_s) {
    double dd = (drawdown_m <= 0.0) ? 1e-9 : drawdown_m;
    return static_head_m + (pump_rate_m3s * time_s) / dd;
}
