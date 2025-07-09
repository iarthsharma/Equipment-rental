import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Optional;

public class BookingServiceTest {

    @InjectMocks
    private BookingService bookingService;

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private EquipmentRepository equipmentRepository;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateBooking() {
        Booking booking = new Booking();
        booking.setId("1");
        booking.setUserId("user1");
        booking.setEquipmentId("equipment1");
        booking.setStartDate("2023-10-01");
        booking.setEndDate("2023-10-05");
        booking.setStatus("CONFIRMED");

        when(equipmentRepository.findById("equipment1")).thenReturn(Optional.of(new Equipment()));
        when(userRepository.findById("user1")).thenReturn(Optional.of(new User()));
        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);

        Booking createdBooking = bookingService.createBooking(booking);

        assertNotNull(createdBooking);
        assertEquals("1", createdBooking.getId());
        verify(bookingRepository, times(1)).save(booking);
    }

    @Test
    public void testGetBookingById() {
        Booking booking = new Booking();
        booking.setId("1");

        when(bookingRepository.findById("1")).thenReturn(Optional.of(booking));

        Booking foundBooking = bookingService.getBookingById("1");

        assertNotNull(foundBooking);
        assertEquals("1", foundBooking.getId());
    }

    @Test
    public void testUpdateBooking() {
        Booking existingBooking = new Booking();
        existingBooking.setId("1");
        existingBooking.setStatus("CONFIRMED");

        when(bookingRepository.findById("1")).thenReturn(Optional.of(existingBooking));

        existingBooking.setStatus("CANCELLED");
        when(bookingRepository.save(existingBooking)).thenReturn(existingBooking);

        Booking updatedBooking = bookingService.updateBooking(existingBooking);

        assertNotNull(updatedBooking);
        assertEquals("CANCELLED", updatedBooking.getStatus());
        verify(bookingRepository, times(1)).save(existingBooking);
    }

    @Test
    public void testDeleteBooking() {
        Booking booking = new Booking();
        booking.setId("1");

        when(bookingRepository.findById("1")).thenReturn(Optional.of(booking));

        bookingService.deleteBooking("1");

        verify(bookingRepository, times(1)).delete(booking);
    }
}