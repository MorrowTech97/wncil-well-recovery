#include <math.h>
#include <emscripten/emscripten.h>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

// INPUTS (US units):
//   D_ft = measured depth to water after pumping (ft below ref)
//   S_ft = static depth to water before pumping (ft below ref)
//   Q_gpm = pump rate (gallons per minute)
//   T_min = pump duration (minutes)
//   C_in = well diameter (inches)
//
// OUTPUT:
//   x_ft = "recovery during pumping" vs. no-inflow case (feet)
// NOTE: Replace the placeholder math with your real formula.
EMSCRIPTEN_KEEPALIVE
double well_recovery_rate(double D_ft,
                          double S_ft,
                          double Q_gpm,
                          double T_min,
                          double C_in)
{
    // --- unit conversions ---
    const double GPM_TO_CFS = 0.00222800926; // 1 gpm ≈ 0.002228 cfs
    double Q_cfs = Q_gpm * GPM_TO_CFS;
    double T_s   = T_min * 60.0;
    double C_ft  = C_in / 12.0;

    // Cross-sectional area of well (ft^2): A = π * d^2 / 4
    double area_ft2 = (C_ft > 0.0) ? (M_PI * C_ft * C_ft / 4.0) : 0.0;

    // ----- PLACEHOLDER MODEL (replace with your formula) -----
    // No-inflow drawdown based purely on pumped volume in the wellbore:
    // V = Q * T  (ft^3),  sd_no_inflow = V / A  (ft)
    double V_ft3 = Q_cfs * T_s;
    double sd_no_inflow_ft = (area_ft2 > 0.0) ? (V_ft3 / area_ft2) : 0.0;

    // Observed drawdown = D - S  (ft; positive means deeper water level)
    double sd_obs_ft = D_ft - S_ft;

    // "Recovery vs no-inflow" = how much was "gained back" compared to no-inflow case
    double x_ft = sd_no_inflow_ft - sd_obs_ft;

    return x_ft; // <-- Replace with your formula’s final expression when ready
}
